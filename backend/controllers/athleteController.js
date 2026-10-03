const Athlete = require('../models/Athlete');

// @desc    Get all athletes
// @route   GET /api/athletes
// @access  Private (Admin/Coach)
exports.getAllAthletes = async (req, res) => {
  try {
    const { district, status, category } = req.query;
    
    let query = {};
    
    if (district) query['address.district'] = district;
    if (status) query.registrationStatus = status;
    if (category) query['sportsDetails.category'] = category;

    const athletes = await Athlete.find(query)
      .populate('userId', 'name email phone district')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: athletes.length,
      data: { athletes }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching athletes',
      error: error.message
    });
  }
};

// @desc    Get single athlete
// @route   GET /api/athletes/:id
// @access  Private
exports.getAthlete = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id)
      .populate('userId', 'name email phone district');

    if (!athlete) {
      return res.status(404).json({
        status: 'error',
        message: 'Athlete not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { athlete }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching athlete',
      error: error.message
    });
  }
};

// @desc    Create new athlete
// @route   POST /api/athletes
// @access  Private
exports.createAthlete = async (req, res) => {
  try {
    const athleteData = {
      ...req.body,
      userId: req.user.id
    };

    // Generate ESAC ID if not provided
    if (!athleteData.esacId) {
      const year = new Date().getFullYear();
      const districtCode = athleteData.address.district.substring(0, 3).toUpperCase();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      athleteData.esacId = `ESAC${year}${districtCode}${random}`;
    }

    const athlete = await Athlete.create(athleteData);

    res.status(201).json({
      status: 'success',
      message: 'Athlete registered successfully',
      data: { athlete }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'ESAC ID or Aadhar number already exists'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Error creating athlete',
      error: error.message
    });
  }
};

// @desc    Update athlete
// @route   PUT /api/athletes/:id
// @access  Private
exports.updateAthlete = async (req, res) => {
  try {
    let athlete = await Athlete.findById(req.params.id);

    if (!athlete) {
      return res.status(404).json({
        status: 'error',
        message: 'Athlete not found'
      });
    }

    // Check ownership or admin access
    if (athlete.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this athlete'
      });
    }

    athlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      message: 'Athlete updated successfully',
      data: { athlete }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating athlete',
      error: error.message
    });
  }
};

// @desc    Update athlete performance
// @route   PUT /api/athletes/:id/performance
// @access  Private (Coach/Admin)
exports.updatePerformance = async (req, res) => {
  try {
    const { matchResult, score } = req.body;
    
    let athlete = await Athlete.findById(req.params.id);
    
    if (!athlete) {
      return res.status(404).json({
        status: 'error',
        message: 'Athlete not found'
      });
    }

    // Update performance stats
    athlete.performance.totalMatches += 1;
    
    if (matchResult === 'win') {
      athlete.performance.wins += 1;
    } else if (matchResult === 'loss') {
      athlete.performance.losses += 1;
    }

    if (score && score > athlete.performance.bestScore) {
      athlete.performance.bestScore = score;
    }

    // Calculate average score
    athlete.performance.averageScore = 
      (athlete.performance.averageScore * (athlete.performance.totalMatches - 1) + score) / 
      athlete.performance.totalMatches;

    await athlete.save();

    res.status(200).json({
      status: 'success',
      message: 'Performance updated successfully',
      data: { athlete }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating performance',
      error: error.message
    });
  }
};

// @desc    Delete athlete
// @route   DELETE /api/athletes/:id
// @access  Private (Admin)
exports.deleteAthlete = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);

    if (!athlete) {
      return res.status(404).json({
        status: 'error',
        message: 'Athlete not found'
      });
    }

    await athlete.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Athlete deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting athlete',
      error: error.message
    });
  }
};

// @desc    Get athletes by district
// @route   GET /api/athletes/district/:district
// @access  Private
exports.getAthletesByDistrict = async (req, res) => {
  try {
    const { district } = req.params;
    
    const athletes = await Athlete.find({ 'address.district': district })
      .populate('userId', 'name email phone')
      .sort({ 'performance.bestScore': -1 });

    res.status(200).json({
      status: 'success',
      count: athletes.length,
      data: { athletes }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching district athletes',
      error: error.message
    });
  }
};

// @desc    Get leaderboard
// @route   GET /api/athletes/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res) => {
  try {
    const { category, district } = req.query;
    
    let query = { registrationStatus: 'approved' };
    
    if (category) query['sportsDetails.category'] = category;
    if (district) query['address.district'] = district;

    const athletes = await Athlete.find(query)
      .populate('userId', 'name district')
      .sort({ 'performance.bestScore': -1 })
      .limit(50);

    res.status(200).json({
      status: 'success',
      count: athletes.length,
      data: { athletes }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
};