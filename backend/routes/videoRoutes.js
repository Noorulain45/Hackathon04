const express = require('express');
const {
    getVideos,
    getAdminVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
} = require('../controllers/videoController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.route('/')
    .get(getVideos)
    .post(protect, admin, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createVideo);

router.route('/admin')
    .get(protect, admin, getAdminVideos);

router.route('/:id')
    .get(getVideoById)
    .put(protect, admin, updateVideo)
    .delete(protect, admin, deleteVideo);

module.exports = router;
