const express = require("express");
const router = express.Router();
const User = require("../models/user");

router
    .route("/")
    .get(async(req, res) => { // get all
        // 1. Get all users from DB
        const users = await User.find();
        // 2. Send the users back as a response
        res.json({ users: users });
    })
    .post(async(req, res) => {
        console.log(`BODY: ${req.body}`);

        // 1. Get data from req.body
        // const title = req.body.title;
        // const body = req.body.body;
        const { name, userName, email } = req.body;

        // 2. Create User
        const user = await User.create({
            name: name,
            userName: userName,
            email: email,
        });

        // 3. Respond with new copy of User
        res.json({
            user: user,
        });
    });

router
    .route("/:id")
    .get(async(req, res) => { // get specific by id
        // 1. Get id off the url
        const userId = req.params.id;

        // 2. Find the user assoc. w/ ID
        const user = await User.findById(userId)

        // 3. Send response with that user as the payload
        res.json({ user: user });
    })
    .put(async(req, res) => {
        // 1. Get id off the url
        const userId = req.params.id;

        // 2. Get the data off the id
        const { name, userName, email } = req.body;

        // 3. Find and Update User
        const user = await User.findByIdAndUpdate(userId, {
            name: name,
            userName: userName,
            email: email,
        });

        // 4. Retrieve updatedUser and send it as a response
        const updatedUser = await User.findById(userId);
        res.json({ user: updatedUser });
    })
    .delete(async(req, res) => {
        // 1. Get the id off the url
        const userId = req.params.id;

        // 2. Delete the record
        await User.findByIdAndDelete(userId);

        // 3. Response
        res.json({
            success: "Record has been deleted"
        })
    });

module.exports = router;