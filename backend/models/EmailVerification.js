const mongoose = require('mongoose');
const crypto = require('crypto');

const emailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  otpHash: {
    type: String,
    required: false
  },
  otpExpiry: {
    type: Date,
    required: false,
    index: true
  },
  failedAttempts: {
    type: Number,
    default: 0
  },
  lastSentAt: {
    type: Date,
    default: Date.now
  },
  verificationProof: {
    type: String,
    default: null
  },
  proofExpiry: {
    type: Date,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: 86400 } // TTL index - auto-delete after 24 hours
  }
}, {
  timestamps: true
});

// Create compound index for email + verification proof
emailVerificationSchema.index({ email: 1, verificationProof: 1 });

// Static method to generate secure OTP
emailVerificationSchema.statics.generateOTP = function() {
  return crypto.randomInt(100000, 1000000).toString();
};

// Static method to hash OTP
emailVerificationSchema.statics.hashOTP = function(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex');
};

// Static method to generate verification proof
emailVerificationSchema.statics.generateVerificationProof = function() {
  return crypto.randomBytes(32).toString('hex');
};

// Static method to hash verification proof
emailVerificationSchema.statics.hashProof = function(proof) {
  return crypto.createHash('sha256').update(proof).digest('hex');
};

module.exports = mongoose.model('EmailVerification', emailVerificationSchema);
