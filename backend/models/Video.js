const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: [{
        type: String,
    }],
    releaseYear: {
        type: Number,
    },
    duration: {
        type: String, // e.g., "1h 30m"
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
