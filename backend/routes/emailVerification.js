const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { sendOTP, verifyOTP } = require('../controllers/emailVerificationController');

// Validation middleware for send OTP
const validateSendOTP = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }
    next();
  }
];

// Validation middleware for verify OTP
const validateVerifyOTP = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('otp').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be 6 digits'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }
    next();
  }
];

// @route   POST /api/email-verification/send
// @desc    Send OTP to email
// @access  Public
router.post('/send', validateSendOTP, sendOTP);

// @route   POST /api/email-verification/verify
// @desc    Verify OTP
// @access  Public
router.post('/verify', validateVerifyOTP, verifyOTP);

module.exports = router;
