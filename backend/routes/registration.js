const express = require('express');
const router = express.Router();
const {
  submitRegistration,
  getRegistrationStatus,
  approveRegistration,
  rejectRegistration,
  getPendingRegistrations
} = require('../controllers/registrationController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/', submitRegistration);
router.get('/status/:esacId', getRegistrationStatus);

// Protected admin routes
router.get('/pending', protect, authorize('admin'), getPendingRegistrations);
router.put('/:id/approve', protect, authorize('admin'), approveRegistration);
router.put('/:id/reject', protect, authorize('admin'), rejectRegistration);

module.exports = router;