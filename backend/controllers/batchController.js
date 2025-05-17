import Batch from '../models/Batch.js';
import ErrorResponse from '../utils/errorResponse.js';

// Named exports for all controller functions
export const getBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find();
    res.status(200).json({ success: true, data: batches });
  } catch (err) {
    next(err);
  }
};

export const getBatch = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return next(new ErrorResponse(`Batch not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: batch });
  } catch (err) {
    next(err);
  }
};

export const createBatch = async (req, res, next) => {
  try {
    req.body.educator = req.educator.id;
    const batch = await Batch.create(req.body);
    res.status(201).json({ success: true, data: batch });
  } catch (err) {
    next(err);
  }
};

export const deleteBatch = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id);
    
    if (!batch) {
      return next(new ErrorResponse(`Batch not found`, 404));
    }
    
    if (batch.educator.toString() !== req.educator.id) {
      return next(new ErrorResponse(`Not authorized to delete this batch`, 401));
    }

    await batch.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};