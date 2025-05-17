import { Router } from 'express';
import { 
  getBatches,
  getBatch,
  createBatch,
  deleteBatch 
} from '../controllers/batchController.js';  // Correct named imports
import { protect } from '../middleware/auth.js';

const router = Router();

// Apply protect middleware to routes that need authentication
router.route('/')
  .get(getBatches)
  .post(protect, createBatch);

router.route('/:id')
  .get(getBatch)
  .delete(protect, deleteBatch);

export default router;  // Default export