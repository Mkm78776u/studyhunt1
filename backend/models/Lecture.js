 import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'video', 'image', 'other']
  },
  batch: {
    type: mongoose.Schema.ObjectId,
    ref: 'Batch',
    required: true
  },
  educator: {
    type: mongoose.Schema.ObjectId,
    ref: 'Educator',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Lecture', LectureSchema);