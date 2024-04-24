const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const postsController = require("../controllers/postsController");

router
    .route("/")
    .get(postsController.fetchAllPosts)
    .post(postsController.createPost);

router
    .route("/:id")
    .get(postsController.fetchPost)
    .put(postsController.updatePost)
    .delete(postsController.deletePost);

module.exports = router;