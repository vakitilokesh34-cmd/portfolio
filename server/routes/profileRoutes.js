import { Router } from 'express';
import { getProfile, createProfile, updateProfile } from '../controllers/profileController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getProfile);
router.post('/', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), createProfile);
router.put('/', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), updateProfile);

export default router;