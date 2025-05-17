import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import batchRoutes from './routes/batchRoutes.js';  // Default import

// ... other imports

app.use('/api/v1/batches', batchRoutes);  // Usage remains the same

// Routes
import authRoutes from './routes/authRoutes.js';
import batchRoutes from './routes/batchRoutes.js';
import lectureRoutes from './routes/lectureRoutes.js';

// Initialize app
const app = express();

// Database connection
import './config/db.js';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/batches', batchRoutes);
app.use('/api/v1/lectures', lectureRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});