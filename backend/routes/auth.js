const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  upload
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Validation middleware
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').customSanitizer(val => val ? val.toString().replace(/^\+91\s*/, '').replace(/\s+/g, '') : '').matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number'),
  body('district').notEmpty().withMessage('District is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }
    next();
  }
];

const validateLogin = [
  body('password').notEmpty().withMessage('Password is required'),
  body().custom((value, { req }) => {
    if (!req.body.phone && !req.body.email) {
      throw new Error('Please provide phone number or email');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }
    next();
  }
];

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, upload.single('profilePicture'), updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;