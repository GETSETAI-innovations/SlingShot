const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
  esacId: {
    type: String,
    required: [true, 'ESAC ID is required'],
    unique: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalDetails: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^[0-9]{12}$/, 'Please provide a valid 12-digit Aadhar number']
    }
  },
  contactDetails: {
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true,
      enum: [
        'Raipur', 'Bastar', 'Bilaspur', 'Durg', 'Surguja', 'Rajnandgaon', 'Korba', 
        'Dantewada', 'Sukma', 'Balod', 'Baloda Bazar', 'Balrampur', 'Bemetara', 'Bijapur',
        'Dhamtari', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur',
        'Kabeerdham', 'Kanker', 'Kondagaon', 'Koriya', 'Mahasamund', 'Manpur', 'Mungeli',
        'Narayanpur', 'Raigarh', 'Surajpur', 'Khairagarh-Chhuikhadan-Gandai', 
        'Mohla-Manpur-Ambagadh Chowki', 'Sakti', 'Sarangarh-Bilaigarh', 'Shivrinarayan'
      ]
    },
    state: {
      type: String,
      default: 'Chhattisgarh'
    },
    pincode: {
      type: String,
      required: true,
      match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
    }
  },
  sportsDetails: {
    category: {
      type: String,
      enum: ['junior', 'senior', 'veteran'],
      required: true
    },
    preferredDistance: {
      type: String,
      enum: ['10m', '15m', 'both'],
      required: true
    },
    experience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    achievements: [{
      title: String,
      year: Number,
      level: String
    }]
  },
  coachDetails: {
    name: String,
    esacId: String,
    phone: String,
    academy: String
  },
  medicalInfo: {
    hasMedicalConditions: {
      type: Boolean,
      default: false
    },
    conditions: [String],
    medications: [String]
  },
  documents: {
    aadharCard: String,
    photo: String,
    medicalCertificate: String,
    consentForm: String
  },
  registrationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  ranking: {
    state: {
      type: Number,
      default: 0
    },
    district: {
      type: Number,
      default: 0
    },
    category: String
  },
  performance: {
    totalMatches: {
      type: Number,
      default: 0
    },
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    },
    bestScore: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
athleteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create compound index for efficient queries
athleteSchema.index({ esacId: 1 });
athleteSchema.index({ userId: 1 });
athleteSchema.index({ 'address.district': 1 });
athleteSchema.index({ registrationStatus: 1 });

module.exports = mongoose.model('Athlete', athleteSchema);