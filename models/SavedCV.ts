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
    id: String,
    personalInfo: {
      fullName: String,
      title: String,
      email: String,
      phone: String,
      address: String,
      website: String,
      linkedin: String,
      github: String,
      avatar: String,
    },
    summary: String,
    experiences: [{
      id: String,
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: [String],
      technologies: [String],
    }],
    education: [{
      id: String,
      institution: String,
      degree: String,
      field: String,
      startDate: String,
      endDate: String,
      gpa: String,
      description: String,
    }],
    skills: [{
      id: String,
      name: String,
      level: String,
      category: String,
    }],
    projects: [{
      id: String,
      name: String,
      description: String,
      technologies: [String],
      url: String,
      github: String,
      startDate: String,
      endDate: String,
    }],
    languages: [{
      name: String,
      level: String,
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: String,
    }],
    lastModified: String,
    templateId: String,
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