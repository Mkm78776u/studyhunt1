const Lecture = require('../models/Lecture');
const Batch = require('../models/Batch');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');

// @desc    Get lectures for a batch
// @route   GET /api/batches/:batchId/lectures
// @access  Public
exports.getLectures = asyncHandler(async (req, res, next) => {
  const lectures = await Lecture.find({ batch: req.params.batchId });

  res.status(200).json({
    success: true,
    count: lectures.length,
    data: lectures
  });
});

// @desc    Upload lecture material
// @route   POST /api/batches/:batchId/lectures
// @access  Private
exports.uploadLecture = asyncHandler(async (req, res, next) => {
  const batch = await Batch.findById(req.params.batchId);

  if (!batch) {
    return next(
      new ErrorResponse(`Batch not found with id of ${req.params.batchId}`, 404)
    );
  }

  // Make sure educator is batch owner
  if (batch.educator.toString() !== req.educator.id) {
    return next(
      new ErrorResponse(
        `Educator ${req.educator.id} is not authorized to add lectures to this batch`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Check file type
  const fileTypes = ['application/pdf', 'video/mp4', 'video/webm', 'image/jpeg', 'image/png'];
  if (!fileTypes.includes(file.mimetype)) {
    return next(new ErrorResponse(`Please upload a valid file type (PDF, MP4, JPEG, PNG)`, 400));
  }

  // Create custom filename
  file.name = `lecture_${batch._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    const lecture = await Lecture.create({
      title: req.body.title,
      description: req.body.description,
      fileUrl: `/uploads/${file.name}`,
      fileType: file.mimetype,
      batch: req.params.batchId,
      educator: req.educator.id
    });

    res.status(201).json({
      success: true,
      data: lecture
    });
  });
});

// @desc    Delete lecture
// @route   DELETE /api/lectures/:id
// @access  Private
exports.deleteLecture = asyncHandler(async (req, res, next) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture) {
    return next(
      new ErrorResponse(`Lecture not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure educator is lecture owner
  if (lecture.educator.toString() !== req.educator.id) {
    return next(
      new ErrorResponse(
        `Educator ${req.educator.id} is not authorized to delete this lecture`,
        401
      )
    );
  }

  await lecture.remove();

  res.status(200).json({ success: true, data: {} });
});