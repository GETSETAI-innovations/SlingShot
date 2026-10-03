const express = require('express');
const router = express.Router();
const {
  getAllAthletes,
  getAthlete,
  createAthlete,
  updateAthlete,
  updatePerformance,
  deleteAthlete,
  getAthletesByDistrict,
  getLeaderboard
} = require('../controllers/athleteController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/leaderboard', getLeaderboard);

// Protected routes
router.get('/', protect, authorize('admin', 'coach'), getAllAthletes);
router.get('/district/:district', protect, getAthletesByDistrict);
router.get('/:id', protect, getAthlete);
router.post('/', protect, createAthlete);
router.put('/:id', protect, updateAthlete);
router.put('/:id/performance', protect, authorize('admin', 'coach'), updatePerformance);
router.delete('/:id', protect, authorize('admin'), deleteAthlete);

module.exports = router;