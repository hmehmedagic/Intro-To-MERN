const Note = require("../models/note");

const fetchAllNotes = async(req, res) => { // get all
    // 1. Get all Notes from DB
    const notes = await Note.find();
    // 2. Send the notes back as a response
    res.json({ notes: notes });
}

const fetchNote = async(req, res) => { // get specific by id
    // 1. Get id off the url
    const noteId = req.params.id;

    // 2. Find the note assoc. w/ ID
    const note = await Note.findById(noteId)

    // 3. Send response with that note as the payload
    res.json({ note: note });
}

const createNote = async(req, res) => {
    console.log(`BODY: ${req.body}`);

    // 1. Get data from req.body
    // const title = req.body.title;
    // const body = req.body.body;
    const { title, body } = req.body;

    // 2. Create Note
    const note = await Note.create({
        title: title,
        body: body,
    });

    // 3. Respond with new copy of Note
    res.json({
        note: note,
    });
}

const updateNote = async(req, res) => {
    // 1. Get id off the url
    const noteId = req.params.id;

    // 2. Get the data off the id
    const { title, body } = req.body;

    // 3. Find and Update Note
    const note = await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body,
    });

    // 4. Retrieve updatedNote and send it as a response
    const updatedNote = await Note.findById(noteId);
    res.json({ note: updatedNote });
}

const deleteNote = async(req, res) => {
    // 1. Get the id off the url
    const noteId = req.params.id;

    // 2. Delete the record
    await Note.findByIdAndDelete(noteId);

    // 3. Response
    res.json({
        success: "Record has been deleted"
    })
}

module.exports = {
    fetchAllNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}