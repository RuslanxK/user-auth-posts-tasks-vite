const express = require('express');
const Post = require("../models/post");
const router = express.Router();
const authenticate = require('../middleware/auth')


router.get('/', authenticate, async (req, res) => {
  try {
    const posts = await Post.find({user: req.user.id});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', authenticate, async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({ title, description, user: req.user.id });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
