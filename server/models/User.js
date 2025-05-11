const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Subdocument schema for loan applications
const LoanApplicationSchema = new Schema({
  fullName: { type: String, required: true },
  address: { type: String },
  loanAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  loanTenure: { type: Number, required: true },
  employmentStatus: {
    type: String,
    enum: ['employed', 'unemployed', 'self-employed', 'student', 'retired'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Base User schema (common fields for all roles)
const BaseUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin', 'verifier'],
    required: true
  }
}, { discriminatorKey: 'role', timestamps: true });

// Password hashing middleware
BaseUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method
BaseUserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the base User model
const User = mongoose.model('User', BaseUserSchema);

// Schema for 'user' role (includes loanApplications)
const UserRoleSchema = new Schema({
  loanApplications: {
    type: [LoanApplicationSchema],
    default: []
  }
});

// Schema for 'admin' and 'verifier' roles (can be extended later)
const AdminVerifierRoleSchema = new Schema({});

// Define discriminators for each role
const UserModel = User.discriminator('user', UserRoleSchema);
const AdminModel = User.discriminator('admin', AdminVerifierRoleSchema);
const VerifierModel = User.discriminator('verifier', AdminVerifierRoleSchema);

// Export all models
module.exports = {
  User,         // Base model
  UserModel,    // Role: 'user'
  AdminModel,   // Role: 'admin'
  VerifierModel // Role: 'verifier'
};
