const Video = require('../models/Video');

// @desc    Get all public videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
    // Optionally filter by visibility or genre
    const { genre } = req.query;
    let query = { visibility: 'public' };

    if (genre) {
        // Use a case-insensitive regex for robust matching
        query.genre = { $regex: new RegExp(`^${genre}$`, 'i') };
    }

    const videos = await Video.find(query).sort({ createdAt: -1 });
    res.json(videos);
};

// @desc    Get all videos (Admin only)
// @route   GET /api/videos/admin
// @access  Private/Admin
const getAdminVideos = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: -1 });
    res.json(videos);
};

// @desc    Get video by id (Subscription protected in frontend, but basic check here)
// @route   GET /api/videos/:id
// @access  Public (frontend to enforce auth check, or you can add protect middleware here)
const getVideoById = async (req, res) => {
    const video = await Video.findById(req.params.id);

    if (video) {
        res.json(video);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
};

// @desc    Upload new video metadata
// @route   POST /api/videos
// @access  Private/Admin
const createVideo = async (req, res) => {
    try {
        const { title, description, genre, releaseYear, duration, visibility } = req.body;

        // Ensure files exist
        if (!req.files || !req.files['thumbnail'] || !req.files['video']) {
            return res.status(400).json({ message: 'Missing thumbnail or video file' });
        }

        const thumbnailUrl = req.files['thumbnail'][0].path;
        const videoUrl = req.files['video'][0].path;

        const video = new Video({
            title,
            description,
            genre: typeof genre === 'string' ? genre.split(',') : genre,
            releaseYear,
            duration,
            thumbnailUrl,
            videoUrl,
            visibility,
            createdBy: req.user._id,
        });

        const createdVideo = await video.save();
        res.status(201).json(createdVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a video
// @route   PUT /api/videos/:id
// @access  Private/Admin
const updateVideo = async (req, res) => {
    const { title, description, genre, releaseYear, duration, visibility } = req.body;

    const video = await Video.findById(req.params.id);

    if (video) {
        video.title = title || video.title;
        video.description = description || video.description;
        video.genre = genre ? (typeof genre === 'string' ? genre.split(',') : genre) : video.genre;
        video.releaseYear = releaseYear || video.releaseYear;
        video.duration = duration || video.duration;
        video.visibility = visibility || video.visibility;

        const updatedVideo = await video.save();
        res.json(updatedVideo);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
const deleteVideo = async (req, res) => {
    const video = await Video.findById(req.params.id);

    if (video) {
        // Technically, you should also delete the asset from Cloudinary here
        await Video.deleteOne({ _id: req.params.id });
        res.json({ message: 'Video removed' });
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
};

module.exports = {
    getVideos,
    getAdminVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
};
