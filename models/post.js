// Models are a representation of our data.
// Schema: we create a blueprint for the model so we can export that format to our express server and eventually link it to our routes.

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: Number,
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;