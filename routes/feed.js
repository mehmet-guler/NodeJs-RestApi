const express = require('express');

// validation
const { body } = require('express-validator');

const router = express.Router();

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// validation middleware
router.post('/post',
    isAuth,
    [
        body('title').trim().isLength({ min: 5 }),
        body('content').trim().isLength({ min: 5 }),
    ],
    feedController.createPost
);

// Fetching single post
router.get('/post/:postId', isAuth, feedController.getPost);

// Updating post
router.put('/post/:postId',
    isAuth,
    [
        body('title').trim().isLength({ min: 5 }),
        body('content').trim().isLength({ min: 5 }),
    ],
    feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;