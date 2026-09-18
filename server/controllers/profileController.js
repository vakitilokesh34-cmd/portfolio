import Profile from '../models/Profile.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createProfile = async (req, res) => {
  try {
    let avatarUrl = req.body.avatarUrl || '';
    let resumeUrl = req.body.resumeUrl || '';
    if (req.files) {
      if (req.files.avatar) {
        const result = await uploadToCloudinary(req.files.avatar[0].buffer, {
          folder: 'portfolio/profile/avatar',
        });
        avatarUrl = result.secure_url;
      }
      if (req.files.resume) {
        const result = await uploadToCloudinary(req.files.resume[0].buffer, {
          folder: 'portfolio/profile/resume',
          resource_type: 'raw',
        });
        resumeUrl = result.secure_url;
      }
    }
    const profile = await Profile.create({ ...req.body, avatarUrl, resumeUrl });
    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.files) {
      if (req.files.avatar) {
        const result = await uploadToCloudinary(req.files.avatar[0].buffer, {
          folder: 'portfolio/profile/avatar',
        });
        updateData.avatarUrl = result.secure_url;
      }
      if (req.files.resume) {
        const result = await uploadToCloudinary(req.files.resume[0].buffer, {
          folder: 'portfolio/profile/resume',
          resource_type: 'raw',
        });
        updateData.resumeUrl = result.secure_url;
      }
    }
    const profile = await Profile.findOneAndUpdate({}, updateData, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};