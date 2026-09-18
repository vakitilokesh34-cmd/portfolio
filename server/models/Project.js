import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: 1000,
    },
    longDescription: {
      type: String,
      default: '',
    },
    techStack: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    demoUrl: {
      type: String,
      default: '',
    },
    repoUrl: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['Full-Stack', 'Frontend', 'AI/ML', '3D', 'Other'],
      default: 'Other',
    },
    highlights: {
      type: [String],
      default: [],
    },
    challenges: {
      type: String,
      default: '',
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', description: 'text', techStack: 'text' });

const Project = mongoose.model('Project', projectSchema);

export default Project;