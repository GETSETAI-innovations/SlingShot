const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Export upload middleware
exports.upload = upload;

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    console.log('Registration request body:', req.body);

    const { name, email, password, phone, district, role, dateOfBirth, discipline, category } = req.body;

    const cleanPhone = phone ? phone.toString().trim().replace(/^\+91\s*/, '').replace(/\s+/g, '') : '';

    console.log('Clean phone:', cleanPhone);

    // Check if user already exists by phone (email is optional)
    const queryConditions = [{ phone: cleanPhone }];
    if (email && email.trim()) {
      queryConditions.push({ email: email.toString().trim().toLowerCase() });
    }

    const userExists = await User.findOne({
      $or: queryConditions
    });

    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'An athlete account with this phone number or email already exists'
      });
    }

    // Create user
    const userData = {
      name,
      email: email && email.trim() ? email.toString().trim().toLowerCase() : undefined,
      password,
      phone: cleanPhone,
      district,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      discipline,
      category,
      role: role || 'athlete'
    };

    console.log('Creating user with data:', { ...userData, password: '***' });

    const user = await User.create(userData);

    console.log('User created successfully:', user._id);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          fullName: user.name,
          email: user.email,
          phone: user.phone,
          district: user.district,
          role: user.role,
          address: user.address,
          profilePicture: user.profilePicture,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          category: user.category,
          discipline: user.discipline,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    res.status(500).json({
      status: 'error',
      message: 'Error registering user',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Validate phone/email & password
    if ((!email && !phone) || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide phone number or email and password'
      });
    }

    // Check for user by phone or email
    const queryConditions = [];
    if (phone) {
      const cleanPhone = phone.toString().trim().replace(/^\+91\s*/, '').replace(/\s+/g, '');
      queryConditions.push({ phone: cleanPhone });
      queryConditions.push({ phone: phone.toString().trim() });
    }
    if (email) {
      queryConditions.push({ email: email.toString().trim().toLowerCase() });
    }

    const user = await User.findOne({ $or: queryConditions }).select('+password');
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials. No user found with this phone/email.'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Your account has been deactivated'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          fullName: user.name,
          email: user.email,
          phone: user.phone,
          district: user.district,
          role: user.role,
          address: user.address,
          profilePicture: user.profilePicture,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          category: user.category,
          discipline: user.discipline,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error logging in',
      error: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          district: user.district,
          role: user.role,
          address: user.address,
          profilePicture: user.profilePicture,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching user data',
      error: error.message
    });
  }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      district: req.body.district,
      address: req.body.address,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      category: req.body.category,
      discipline: req.body.discipline
    };

    // Handle profile picture - either from file upload or base64
    if (req.file) {
      fieldsToUpdate.profilePicture = `/uploads/${req.file.filename}`;
    } else if (req.body.profilePicture) {
      // If profile picture is sent as base64 or URL, store it directly
      fieldsToUpdate.profilePicture = req.body.profilePicture;
    }

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key =>
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      message: 'User details updated successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          fullName: user.name,
          email: user.email,
          phone: user.phone,
          district: user.district,
          role: user.role,
          address: user.address,
          profilePicture: user.profilePicture,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          category: user.category,
          discipline: user.discipline,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Update details error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating user details',
      error: error.message
    });
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide current and new password'
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }

    user.password = newPassword;
    await user.save();

    // Generate new token
    const token = generateToken(user._id);

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
      data: { token }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating password',
      error: error.message
    });
  }
};