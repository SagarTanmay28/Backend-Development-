const express = require('express');

// MongoDB se connect karne wala function import kiya
const connectToDB = require('./src/db/db');


// Note model import kiya
// Is model ki help se database operations karenge
const noteModel = require('./src/models/note.model');



// Express server create ho gaya
const app = express();



// MongoDB database se connection establish kar diya
connectToDB();



// Middleware
// Ye incoming JSON data ko parse karta hai
// Without this -> req.body undefined milega
app.use(express.json());






// CREATE NOTE API
// POST request -> data create karne ke liye use hoti hai
app.post('/notes', async (req, res) => {

    try {

        // Frontend/Postman se title aur content aa raha hai
        const { title, content } = req.body;


        // Validation
        // Agar title ya content nahi aaya to error bhej do
        if (!title || !content) {

            return res.status(400).json({
                message: "Title and content are required"
            });
        }


        // Database me new note create kar diya
        // await lagaya because DB operation asynchronous hota hai
        const note = await noteModel.create({
            title,
            content
        });


        // Success response bhej diya
        // 201 means resource successfully create ho gaya
        res.status(201).json({
            message: "Note Created Successfully",
            note
        });

    } catch (error) {

        // Agar server/database me koi issue aaye
        // to catch block execute hoga
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});






// GET ALL NOTES API
// GET request -> data fetch karne ke liye use hoti hai
app.get('/notes', async (req, res) => {

    try {

        // Database se saare notes fetch kar liye
        const notes = await noteModel.find();


        // Client ko saare notes bhej diye
        res.status(200).json({
            message: "Notes fetched Successfully",
            notes
        });

    } catch (error) {

        // Error handling
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});






// DELETE NOTE API
// :id is route parameter
// Example -> /notes/685abfjj123
app.delete('/notes/:id', async (req, res) => {

    try {

        // URL se note ki id nikal li
        const noteId = req.params.id;


        // Database me jis document ki _id match karegi
        // vo delete ho jayega
        const deletedNote = await noteModel.findOneAndDelete({
            _id: noteId
        });


        // Agar note exist nahi karta
        if (!deletedNote) {

            return res.status(404).json({
                message: "Note not found"
            });
        }


        // Success response
        res.json({
            message: "Note Deleted Successfully"
        });

    } catch (error) {

        // Error handling
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});






// UPDATE NOTE API
// PATCH -> partial update ke liye use hota hai
app.patch('/notes/:id', async (req, res) => {

    try {

        // URL se note ki id nikal li
        const noteId = req.params.id;


        // Frontend se updated title aa raha hai
        const { title } = req.body;


        // Database me matching document find karke
        // uska title update kar diya
        const updatedNote = await noteModel.findOneAndUpdate(
            {
                _id: noteId
            },
            {
                title: title
            },
            {
                // Updated document return karega
                new: true
            }
        );


        // Agar note exist nahi karta
        if (!updatedNote) {

            return res.status(404).json({
                message: "Note not found"
            });
        }


        // Success response
        res.json({
            message: "Note Updated Successfully",
            updatedNote
        });

    } catch (error) {

        // Error handling
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});






// Server ko port 3000 pe start kar diya
app.listen(3000, () => {

    console.log("Server is running on port 3000");
});
