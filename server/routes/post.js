const express = require('express');
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getPosts);               // PUBLIC → List all posts
router.get('/:id', getPostById);         // PUBLIC → Single post
router.post('/', authMiddleware, createPost);  // Protected → Admin only
router.put('/:id', authMiddleware, updatePost); // Protected → Admin only
router.delete('/:id', authMiddleware, deletePost); // Protected → Admin only

module.exports = router;
