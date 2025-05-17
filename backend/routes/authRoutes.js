import { Router } from 'express';
import { 
  login,
  register,
  getMe
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected route (requires valid JWT)
router.get('/me', protect, getMe);

export default router;