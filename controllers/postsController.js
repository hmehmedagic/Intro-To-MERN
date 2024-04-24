const Post = require("../models/post");

const fetchAllPosts = async(req, res) => { // get all
    // 1. Get all Posts from DB
    const posts = await Post.find();
    // 2. Send the posts back as a response
    res.json({ posts: posts });
}

const fetchPost = async(req, res) => { // get specific by id
    // 1. Get id off the url
    const postId = req.params.id;

    // 2. Find the post assoc. w/ ID
    const post = await Post.findById(postId)

    // 3. Send response with that post as the payload
    res.json({ post: post });
}

const createPost = async(req, res) => {
    console.log(`BODY: ${req.body}`);

    // 1. Get data from req.body
    // const title = req.body.title;
    // const body = req.body.body;
    const { userId, title, content } = req.body;

    // 2. Create Post
    const post = await Post.create({
        userId: userId,
        title: title,
        content: content,
    });

    // 3. Respond with new copy of Post
    res.json({
        post: post,
    });
}

const updatePost = async(req, res) => {
    // 1. Get id off the url
    const postId = req.params.id;

    // 2. Get the data off the id
    const { userId, title, content } = req.body;

    // 3. Find and Update Post
    await Post.findByIdAndUpdate(postId, {
        userId: userId,
        title: title,
        content: content,
    });

    // 4. Retrieve updatedPost and send it as a response
    const updatedPost = await Post.findById(postId);
    res.json({ post: updatedPost });
}

const deletePost = async(req, res) => {
    // 1. Delete the record
    await Post.findByIdAndDelete(req.params.id);

    // 2. Response
    res.json({
        success: "Record has been deleted"
    })
}

module.exports = {
    fetchAllPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost
}