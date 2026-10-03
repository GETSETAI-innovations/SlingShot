const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'coach', 'athlete', 'district_coordinator', 'user'],
    default: 'user'
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  district: {
    type: String,
    required: [true, 'Please provide your district'],
    enum: [
      'Raipur', 'Bastar', 'Bilaspur', 'Durg', 'Surguja', 'Rajnandgaon', 'Korba',
      'Dantewada', 'Sukma', 'Balod', 'Baloda Bazar', 'Balrampur', 'Bemetara', 'Bijapur',
      'Dhamtari', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur',
      'Kabeerdham', 'Kanker', 'Kondagaon', 'Koriya', 'Mahasamund', 'Manpur', 'Mungeli',
      'Narayanpur', 'Raigarh', 'Surajpur', 'Khairagarh-Chhuikhadan-Gandai',
      'Mohla-Manpur-Ambagadh Chowki', 'Sakti', 'Sarangarh-Bilaigarh'
    ]
  },
  address: {
    street: String,
    city: String,
    state: {
      type: String,
      default: 'Chhattisgarh'
    },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  dateOfBirth: {
    type: Date
  },
  discipline: {
    type: String
  },
  category: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
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

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update timestamp on save
userSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('User', userSchema);