const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const {
    uploadResume,
    getHistory,
    getAnalysisById
} = require('../controller/resumeController');

router.post(
    '/upload',
    authMiddleware,
    upload.single('resume'),
    uploadResume
);

router.get(
    '/history',
    authMiddleware,
    getHistory
);

router.get(
    '/:id',
    authMiddleware,
    getAnalysisById
);

module.exports = router;