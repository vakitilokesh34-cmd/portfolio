import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      default: 'Vakiti Lokesh',
    },
    tagline: {
      type: String,
      default: '',
    },
    heading: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    about: {
      paragraphs: {
        type: [String],
        default: [],
      },
      highlights: {
        type: [String],
        default: [],
      },
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      leetcode: { type: String, default: '' },
      gfg: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    skills: {
      type: [
        {
          name: String,
          level: Number,
          category: String,
          icon: String,
        },
      ],
      default: [],
    },
    education: {
      type: [
        {
          institution: String,
          degree: String,
          field: String,
          period: String,
          details: String,
        },
      ],
      default: [],
    },
    journey: {
      type: [
        {
          year: String,
          title: String,
          description: String,
        },
      ],
      default: [],
    },
    achievements: {
      type: [
        {
          title: String,
          description: String,
          link: String,
          icon: String,
        },
      ],
      default: [],
    },
    stats: {
      type: Object,
      default: {
        projects: 0,
        contributions: 0,
        prs: 0,
        problemsSolved: 0,
      },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;