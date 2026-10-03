const Athlete = require('../models/Athlete');

// @desc    Submit athlete registration
// @route   POST /api/registration
// @access  Public
exports.submitRegistration = async (req, res) => {
  try {
    const registrationData = req.body;

    // Check if Aadhar already exists
    const existingAthlete = await Athlete.findOne({
      'personalDetails.aadharNumber': registrationData.personalDetails.aadharNumber
    });

    if (existingAthlete) {
      return res.status(400).json({
        status: 'error',
        message: 'Athlete with this Aadhar number already registered'
      });
    }

    // Generate ESAC ID
    const year = new Date().getFullYear();
    const districtCode = registrationData.address.district.substring(0, 3).toUpperCase();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const esacId = `ESAC${year}${districtCode}${random}`;

    // Create athlete with generated ESAC ID
    const athlete = await Athlete.create({
      ...registrationData,
      esacId,
      registrationStatus: 'pending'
    });

    res.status(201).json({
      status: 'success',
      message: 'Registration submitted successfully. Your ESAC ID: ' + esacId,
      data: {
        athlete,
        esacId
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Duplicate entry found'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Error submitting registration',
      error: error.message
    });
  }
};

// @desc    Get registration status
// @route   GET /api/registration/status/:esacId
// @access  Public
exports.getRegistrationStatus = async (req, res) => {
  try {
    const { esacId } = req.params;

    const athlete = await Athlete.findOne({ esacId });

    if (!athlete) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        esacId: athlete.esacId,
        registrationStatus: athlete.registrationStatus,
        fullName: athlete.personalDetails.fullName,
        district: athlete.address.district,
        submittedAt: athlete.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching registration status',
      error: error.message
    });
  }
};

// @desc    Approve registration (Admin)
// @route   PUT /api/registration/:id/approve
// @access  Private (Admin)
exports.approveRegistration = async (req, res) => {
  try {
    const athlete = await Athlete.findByIdAndUpdate(
      req.params.id,
      { registrationStatus: 'approved' },
      { new: true }
    );

    if (!athlete) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Registration approved successfully',
      data: { athlete }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error approving registration',
      error: error.message
    });
  }
};

// @desc    Reject registration (Admin)
// @route   PUT /api/registration/:id/reject
// @access  Private (Admin)
exports.rejectRegistration = async (req, res) => {
  try {
    const { reason } = req.body;

    const athlete = await Athlete.findByIdAndUpdate(
      req.params.id,
      { 
        registrationStatus: 'rejected',
        rejectionReason: reason
      },
      { new: true }
    );

    if (!athlete) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Registration rejected',
      data: { athlete }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error rejecting registration',
      error: error.message
    });
  }
};

// @desc    Get pending registrations (Admin)
// @route   GET /api/registration/pending
// @access  Private (Admin)
exports.getPendingRegistrations = async (req, res) => {
  try {
    const registrations = await Athlete.find({ registrationStatus: 'pending' })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: registrations.length,
      data: { registrations }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching pending registrations',
      error: error.message
    });
  }
};