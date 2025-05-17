const express = require('express');
const {
  getLectures,
  uploadLecture,
  deleteLecture
} = require('../controllers/lectureController');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');
const upload = require('../utils/fileUpload');

router.route('/')
  .get(getLectures)
  .post(protect, upload.single('file'), uploadLecture);

router.route('/:id')
  .delete(protect, deleteLecture);

module.exports = router;