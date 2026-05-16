import express from 'express';
import {
  analyzeRepository,
  getRepositoryById,
  getAllRepositories,
  deleteRepository,
  generateRepositoryReadme,
} from '../controllers/repositoryController.js';

const router = express.Router();

// Repository routes
router.post('/analyze', analyzeRepository);
router.get('/', getAllRepositories);
router.get('/:id', getRepositoryById);
router.post('/:id/generate-readme', generateRepositoryReadme);
router.delete('/:id', deleteRepository);

export default router;

// Made with Bob
