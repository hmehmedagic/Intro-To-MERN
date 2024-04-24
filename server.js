require("dotenv").config();
// ---------> allows .env

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// This pulls our Mongoose connection into application
const connectToDb = require("./config/connectToDb");

const Note = require("./models/note");
const notesController = require("./controllers/notesController");

// -> Recieving requests on cross-origins **
const cors = require("cors");

// Express doesn't naturally convert our data to json
app.use(express.urlencoded());
app.use(express.json());

app.use(cors());

// This initializes our connectToDb() function
connectToDb();

// ---------------------------------- Middleware
const users = require('./routes/users');
const posts = require('./routes/posts');

// ---------------------------------- Routing

app.get("/", (req, res) => {
    res.send("This is the Landing Page.")
})

//We want to establish CRUD routes for our Notes Model with Routing
//  Using Controllers
// ------------------------------------- Create
app.post("/notes", notesController.createNote);

// ------------------------------------- Read
app.get("/notes", notesController.fetchAllNotes);

app.get("/notes/:id", notesController.fetchNote);

// ------------------------------------- Update
app.put("/notes/:id", notesController.updateNote);

// ------------------------------------- Delete
app.delete("/notes/:id", notesController.deleteNote);

//We want to establish CRUD routes for our Users Model with Routing
//Using Routes No Controllers
// ------------------------------------- Create
app.use("/users", users);

//We want to establish CRUD routes for our Posts Model with Routing
//Using Routes with Controllers
app.use("/posts", posts);

// ---------------------------------- Server
app.listen(PORT, () => {
    console.log(`Express Server Listening on Port num: ${PORT}`);
});