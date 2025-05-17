import mongoose from 'mongoose';

const BatchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a batch name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
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
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals
BatchSchema.virtual('lectures', {
  ref: 'Lecture',
  localField: '_id',
  foreignField: 'batch',
  justOne: false
});

// Cascade delete lectures when a batch is deleted
BatchSchema.pre('deleteOne', { document: true }, async function(next) {
  await this.model('Lecture').deleteMany({ batch: this._id });
  next();
});

export default mongoose.model('Batch', BatchSchema);