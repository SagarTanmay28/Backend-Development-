const mongoose = require("mongoose");


// Schema defines structure of document
// MongoDB me har note ka structure aisa hoga
const noteSchema = new mongoose.Schema({

    // Note ka title
    title: String,

    // Note ka content
    content: String
});




// Model create kiya
// "note" collection name hai
// MongoDB automatically "notes" collection bana dega
const noteModel = mongoose.model("note", noteSchema);




// Model export kar diya
// Taaki dusri files me use kar sake
module.exports = noteModel;
