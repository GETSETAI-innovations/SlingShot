const EmailVerification = require('../models/EmailVerification');
const { sendOTPEmail } = require('../services/emailService');

// Configuration constants
const OTP_EXPIRY_MINUTES = 5;
const RESEND_COOLDOWN_SECONDS = 60;
const MAX_INCORRECT_ATTEMPTS = 5;
const PROOF_EXPIRY_MINUTES = 15;

// @desc    Send OTP to email
// @route   POST /api/email-verification/send
// @access  Public
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const isDevelopment = process.env.NODE_ENV === 'development';

    // Validate email
    if (!email || !email.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Email address is required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address'
      });
    }

    // Check for existing verification record
    let verification = await EmailVerification.findOne({ email: normalizedEmail });

    const now = new Date();

    // Check resend cooldown
    if (verification && verification.lastSentAt) {
      const timeSinceLastSend = (now - verification.lastSentAt) / 1000; // in seconds
      if (timeSinceLastSend < RESEND_COOLDOWN_SECONDS) {
        const remainingTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeSinceLastSend);
        return res.status(429).json({
          status: 'error',
          message: `Please wait ${remainingTime} seconds before requesting another OTP`,
          cooldownRemaining: remainingTime
        });
      }
    }

    // Generate new OTP
    const OTP = EmailVerification.generateOTP();
    const otpHash = EmailVerification.hashOTP(OTP);
    const otpExpiry = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Create or update verification record
    if (verification) {
      // Invalidate previous OTP by updating it
      verification.otpHash = otpHash;
      verification.otpExpiry = otpExpiry;
      verification.failedAttempts = 0;
      verification.lastSentAt = now;
      verification.isVerified = false;
      verification.verifiedAt = null;
      verification.verificationProof = null;
      verification.proofExpiry = null;
    } else {
      verification = new EmailVerification({
        email: normalizedEmail,
        otpHash,
        otpExpiry,
        lastSentAt: now
      });
    }

    await verification.save();

    // Send OTP email
    try {
      await sendOTPEmail(normalizedEmail, OTP);
    } catch (emailError) {
      console.error('Email send error:', emailError.message);
      // Return a user-friendly error without exposing sensitive details
      return res.status(500).json({
        status: 'error',
        message: 'Failed to send OTP email. Please try again later.',
        error: isDevelopment ? emailError.message : undefined
      });
    }

    // Send response
    return res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully. Please check your email.',
      data: {
        email: normalizedEmail,
        expiryMinutes: OTP_EXPIRY_MINUTES,
        resendCooldownSeconds: RESEND_COOLDOWN_SECONDS
      }
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send OTP. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/email-verification/verify
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate inputs
    if (!email || !email.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Email address is required'
      });
    }

    if (!otp || otp.length !== 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid 6-digit OTP'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otpHash = EmailVerification.hashOTP(otp);

    // Find verification record
    const verification = await EmailVerification.findOne({ email: normalizedEmail });

    if (!verification) {
      return res.status(400).json({
        status: 'error',
        message: 'OTP not found. Please request a new OTP.'
      });
    }

    // Check if OTP has expired
    if (new Date() > verification.otpExpiry) {
      return res.status(400).json({
        status: 'error',
        message: 'Your OTP has expired. Please request a new OTP.'
      });
    }

    // Check if already verified
    if (verification.isVerified) {
      return res.status(400).json({
        status: 'error',
        message: 'This email has already been verified.'
      });
    }

    // Check attempt limit
    if (verification.failedAttempts >= MAX_INCORRECT_ATTEMPTS) {
      return res.status(429).json({
        status: 'error',
        message: 'Too many incorrect attempts. Please request a new OTP.'
      });
    }

    // Verify OTP
    if (otpHash !== verification.otpHash) {
      verification.failedAttempts += 1;
      await verification.save();

      const remainingAttempts = MAX_INCORRECT_ATTEMPTS - verification.failedAttempts;
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect OTP. Please try again.',
        remainingAttempts
      });
    }

    // OTP is correct - generate verification proof
    const verificationProof = EmailVerification.generateVerificationProof();
    const proofHash = EmailVerification.hashProof(verificationProof);
    const proofExpiry = new Date(Date.now() + PROOF_EXPIRY_MINUTES * 60 * 1000);

    // Update verification record
    verification.isVerified = true;
    verification.verifiedAt = new Date();
    verification.verificationProof = proofHash;
    verification.proofExpiry = proofExpiry;
    await verification.save();

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
      data: {
        email: normalizedEmail,
        verificationProof, // Send this to frontend for final signup
        proofExpiryMinutes: PROOF_EXPIRY_MINUTES
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to verify OTP. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Validate verification proof (internal use for signup)
// @access  Private (used by register controller)
exports.validateProof = async (email, proof) => {
  try {
    if (!email || !proof) {
      return { valid: false, message: 'Email and verification proof are required' };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const proofHash = EmailVerification.hashProof(proof);

    const verification = await EmailVerification.findOne({
      email: normalizedEmail,
      verificationProof: proofHash
    });

    if (!verification) {
      return { valid: false, message: 'Invalid verification proof' };
    }

    // Check if proof has expired
    if (new Date() > verification.proofExpiry) {
      return { valid: false, message: 'Verification proof has expired' };
    }

    // Check if already consumed (check by marking it as consumed)
    if (!verification.isVerified) {
      return { valid: false, message: 'Email not verified' };
    }

    // Consume the proof (invalidate it to prevent reuse)
    verification.verificationProof = null;
    verification.proofExpiry = null;
    await verification.save();

    return { valid: true, email: normalizedEmail };
  } catch (error) {
    console.error('Validate proof error:', error);
    return { valid: false, message: 'Error validating verification proof' };
  }
};
