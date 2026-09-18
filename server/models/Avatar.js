import mongoose from 'mongoose';

const avatarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'default',
    },
    modelUrl: {
      type: String,
      required: true,
    },
    thumbUrl: {
      type: String,
    },
    textureUrl: {
      type: String,
    },
    config: {
      type: Object,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Avatar = mongoose.model('Avatar', avatarSchema);

export default Avatar;