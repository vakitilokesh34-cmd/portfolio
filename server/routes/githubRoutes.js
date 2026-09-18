import { Router } from 'express';
import {
  getUserProfile,
  getRepositories,
  getGithubStats,
  getContributions,
} from '../controllers/githubController.js';

const router = Router();

router.get('/profile', getUserProfile);
router.get('/repos', getRepositories);
router.get('/stats', getGithubStats);
router.get('/contributions', getContributions);
router.get('/:username', getGithubStats);

export default router;