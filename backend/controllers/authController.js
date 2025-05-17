import Educator from '../models/Educator.js';
import ErrorResponse from '../utils/errorResponse.js';
import jwt from 'jsonwebtoken';

/**
 * @desc    Login educator (only allows specific credentials)
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  const { username, password } = req.body;

  // Hardcoded credential validation
  if (username !== 'mithileshkumawat1') {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  try {
    const educator = await Educator.findOne({ username }).select('+password');
    
    if (!educator) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await educator.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    const token = educator.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      educator: {
        id: educator._id,
        username: educator.username
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    next(new ErrorResponse('Server error', 500));
  }
};

/**
 * @desc    Prevent new educator registration
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  return next(new ErrorResponse('Registration is disabled', 403));
};

/**
 * @desc    Get logged-in educator profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const educator = await Educator.findById(req.educator.id);
    res.status(200).json({ success: true, data: educator });
  } catch (err) {
    next(err);
  }
};