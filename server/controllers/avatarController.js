import Avatar from '../models/Avatar.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const getAvatar = async (req, res) => {
  try {
    const avatar = await Avatar.findOne({ isActive: true }) || await Avatar.findOne();
    if (!avatar) {
      return res.status(404).json({ success: false, message: 'No avatar found' });
    }
    res.status(200).json({ success: true, data: avatar });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllAvatars = async (req, res) => {
  try {
    const avatars = await Avatar.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: avatars });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'portfolio/avatars',
      resource_type: 'auto',
    });
    const { name, config } = req.body;
    const avatar = await Avatar.create({
      name: name || 'custom',
      modelUrl: result.secure_url,
      thumbUrl: req.body.thumbUrl || '',
      config: config ? JSON.parse(config) : {},
    });
    res.status(201).json({ success: true, data: avatar });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const setActiveAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const avatar = await Avatar.findById(id);
    if (!avatar) {
      return res.status(404).json({ success: false, message: 'Avatar not found' });
    }
    await Avatar.updateMany({}, { isActive: false });
    avatar.isActive = true;
    await avatar.save();
    res.status(200).json({ success: true, data: avatar });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const avatar = await Avatar.findByIdAndDelete(id);
    if (!avatar) {
      return res.status(404).json({ success: false, message: 'Avatar not found' });
    }
    res.status(200).json({ success: true, message: 'Avatar deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};