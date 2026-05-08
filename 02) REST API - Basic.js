const express = require('express');

const app = express(); // Express server create ho gaya

// Middleware
// Ye incoming JSON data ko read karne me help karta hai
// Without this -> req.body undefined milega
app.use(express.json());


// Temporary database
// Data RAM me stored hai
// Server restart hote hi data delete ho jayega
let notes = [];



// CREATE NOTE API
// POST request -> data create karne ke liye use hoti hai
app.post('/notes', (req, res) => {

    // Frontend/Postman se data aa raha hai
    console.log(req.body);

    // Notes array me new note add kar diya
    notes.push(req.body);

    // Client ko response bhej diya
    res.status(201).json({
        message: "Note Created Successfully",
        notes: notes
    });
});




// DELETE NOTE API
// :index is route parameter
// Example -> /notes/0
app.delete('/notes/:index', (req, res) => {

    // URL se index nikal liya
    const index = req.params.index;

    // splice actual element remove karta hai
    notes.splice(index, 1);

    res.json({
        message: "Note Deleted Successfully"
    });
});




// UPDATE NOTE API
// PATCH -> partial update
app.patch('/notes/:index', (req, res) => {

    const index = req.params.index;

    // req.body se title nikal liya
    const { title } = req.body;

    // Specific note ka title update kar diya
    notes[index].title = title;

    res.json({
        message: "Note Updated Successfully",
        notes: notes
    });
});




// GET ALL NOTES API
// Saare notes return karega
app.get('/notes', (req, res) => {

    res.json(notes);
});




// Server ko port 3000 pe start kar diya
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
