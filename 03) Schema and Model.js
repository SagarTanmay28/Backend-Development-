const mongoose = require("mongoose")

// Schema defines structure of document

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
})

// Model create kiya
// "note" -> collection name banega notes

const noteModel = mongoose.model("note", noteSchema)

module.exports = noteModel
