const express = require('express');
const {
    getUserProfile,
    activateSubscription,
    getUsers,
    updateUserStatus,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile').get(protect, getUserProfile);
router.route('/subscription').post(protect, activateSubscription);

router.route('/').get(protect, admin, getUsers);
router.route('/:id/status').put(protect, admin, updateUserStatus);

module.exports = router;
