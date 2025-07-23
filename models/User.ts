import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function(this: any) {
      return this.provider === 'credentials'
    },
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
    enum: ['google', 'facebook', 'credentials'],
    default: 'credentials',
  },
  providerId: {
    type: String,
  },
  // Email verification fields
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationCode: {
    type: String,
  },
  verificationExpires: {
    type: Date,
  },
  // Password security fields
  passwordHistory: [{
    password: String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  // Password reset fields
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Virtual for checking if account is locked
UserSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil.getTime() > Date.now())
})

// Methods for handling failed login attempts
UserSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil.getTime() < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    })
  }
  
  const updates = { $inc: { loginAttempts: 1 } }
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 } // 2 hours
  }
  
  return this.updateOne(updates)
}

// Reset login attempts on successful login
UserSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
    $set: { lastLogin: new Date() }
  })
}

// Password strength validation
UserSchema.methods.validatePasswordStrength = function(password) {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const errors = []
  
  if (password.length < minLength) {
    errors.push(`Mật khẩu phải có ít nhất ${minLength} ký tự`)
  }
  if (!hasUpperCase) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ cái viết hoa')
  }
  if (!hasLowerCase) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ cái viết thường')
  }
  if (!hasNumbers) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ số')
  }
  if (!hasSpecialChar) {
    errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: this.calculatePasswordStrength(password)
  }
}

// Calculate password strength score
UserSchema.methods.calculatePasswordStrength = function(password) {
  let score = 0
  
  // Length bonus
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  
  // Character variety bonus
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
  
  // Complexity bonus
  if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) score += 1
  if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) score += 1
  
  if (score <= 3) return 'weak'
  if (score <= 6) return 'medium'
  return 'strong'
}

UserSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.User || mongoose.model('User', UserSchema)