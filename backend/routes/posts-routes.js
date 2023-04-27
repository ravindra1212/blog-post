const express = require('express');
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-auth-middleware');
const fileMiddleware = require('../middleware/file-middleware');

const PostController = require('./../controllers/post-controller');

// Fetch all post from DB 
router.get('/', checkAuthMiddleware, PostController.fetchPosts);

// Save Post in DB
router.post('/add', checkAuthMiddleware, fileMiddleware, PostController.createPost);

// Update Post in DB
router.post('/:postId/update', checkAuthMiddleware, PostController.updatePost);

// Delete Post Route
router.delete('/:postId/delete', checkAuthMiddleware, PostController.deletePost);

module.exports = router;