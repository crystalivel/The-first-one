const Post = require('../models/post');

exports.getPosts = (req, res) => {
  const posts = Post.getAllPosts();
  res.json(posts);
};

exports.createPost = (req, res) => {
  const newPost = Post.createPost(req.body);
  res.status(201).json(newPost);
};