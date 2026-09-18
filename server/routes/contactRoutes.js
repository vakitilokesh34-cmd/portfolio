import { Router } from 'express';
import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactStatus,
  deleteContactMessage,
} from '../controllers/contactController.js';

const router = Router();

router.get('/', getContactMessages);
router.get('/:id', getContactMessageById);
router.post('/', createContactMessage);
router.put('/:id/status', updateContactStatus);
router.delete('/:id', deleteContactMessage);

export default router;