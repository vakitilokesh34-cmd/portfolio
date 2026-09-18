import { Router } from 'express';
import {
  getAvatar,
  getAllAvatars,
  uploadAvatar,
  setActiveAvatar,
  deleteAvatar,
} from '../controllers/avatarController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getAvatar);
router.get('/all', getAllAvatars);
router.post('/', upload.single('avatar'), uploadAvatar);
router.put('/:id/active', setActiveAvatar);
router.delete('/:id', deleteAvatar);

export default router;