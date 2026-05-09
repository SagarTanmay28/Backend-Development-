const express = require('express');

// Database connection function import kiya
const connectToDB = require('./src/db/db');

// Note model import kiya
// Is model ki help se database ke andar CRUD operations karenge
const noteModel = require('./src/models/note.model');


// MongoDB database se connection establish kar diya
connectToDB();


// Express server create ho gaya
const app = express();



// Middleware
// Ye incoming JSON data ko parse karta hai
// Without this -> req.body undefined milega
app.use(express.json());





// CREATE NOTE API
// POST request -> data create karne ke liye use hoti hai
app.post('/notes', async (req, res) => {

    // Frontend/Postman se title aur content aa raha hai
    const { title, content } = req.body;

    // Console pe print kar diya
    console.log(title, content);


    // Database ke andar new document create kar diya
    // await lagaya because DB operation asynchronous hota hai
    await noteModel.create({
        title,
        content
    });


    // Client ko response bhej diya
    res.json({
        message: "Note Created Successfully"
    });
});






// GET ALL NOTES API
// GET request -> data fetch karne ke liye use hoti hai
app.get('/notes', async (req, res) => {


    // Database se saare notes fetch kar liye
    const notes = await noteModel.find();


    // Client ko notes bhej diye
    res.json({
        message: "Notes fetch Successfully",
        notes
    });
});






// DELETE NOTE API
// :id is route parameter
// Example -> /notes/685abfjj123
app.delete('/notes/:id', async (req, res) => {


    // URL se note ki id nikal li
    const noteId = req.params.id;


    // Database me jis document ki _id match karegi
    // vo delete ho jayega
    await noteModel.findOneAndDelete({
        _id: noteId
    });


    // Success response bhej diya
    res.json({
        message: "Note Deleted Successfully"
    });
});






// UPDATE NOTE API
// PATCH -> partial update ke liye use hota hai
app.patch('/notes/:id', async (req, res) => {


    // URL se note ki id nikal li
    const noteId = req.params.id;


    // Frontend se updated title aa raha hai
    const { title } = req.body;


    // Database me matching document find karke
    // uska title update kar diya
    await noteModel.findOneAndUpdate(
        {
            _id: noteId
        },
        {
            title: title
        }
    );


    // Success response bhej diya
    res.json({
        message: "Notes Updated Successfully"
    });
});






// Server ko port 3000 pe start kar diya
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
