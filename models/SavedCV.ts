import mongoose from 'mongoose'

const SavedCVSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled CV',
  },
  template: {
    type: String,
    required: true,
  },
  cvData: {
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      dateOfBirth: String,
      avatar: String,
    },
    objective: String,
    education: [{
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String,
      gpa: String,
    }],
    experience: [{
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String,
      current: Boolean,
    }],
    skills: [{
      name: String,
      level: String,
    }],
    projects: [{
      name: String,
      description: String,
      technologies: [String],
      startDate: String,
      endDate: String,
      url: String,
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: String,
      url: String,
    }],
    languages: [{
      name: String,
      level: String,
    }],
    references: [{
      name: String,
      position: String,
      company: String,
      email: String,
      phone: String,
    }],
  },
  isPublic: {
    type: Boolean,
    default: false,
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

SavedCVSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.SavedCV || mongoose.model('SavedCV', SavedCVSchema)