1) Server.js 

// Load environment variables from the .env file
// Example:
// MONGODB_URL=mongodb://localhost:27017/cohort

require('dotenv').config();


// Import the Express application
const app = require("./src/app");


// Import the database connection function
const connectDB = require("./src/db/db");


// Establish connection with the MongoDB database
// The database should be connected before handling requests

connectDB();


// Start the server on port 3000
app.listen(3000, () => {

    console.log("Server is running on port 3000");
});



2) App.js 

const express = require("express");

// Import authentication routes
const authRoutes = require("./routes/auth.routes");

// Create an Express application instance
const app = express();


// ===============================
// Middleware
// ===============================

// Parse incoming JSON data from requests
// Without this middleware, req.body will be undefined
app.use(express.json());


// ===============================
// Routes
// ===============================

/*
    Mount authentication routes

    Available endpoints:

    POST /auth/register
    POST /auth/login
*/
app.use('/auth', authRoutes);


// Export the Express application
// This app instance will be used by server.js
module.exports = app;


3) Db.js 

const mongoose = require("mongoose");

// Function to establish a connection with MongoDB
function connectDB() {

    // Connect to MongoDB using the connection string
    // stored in the environment variables (.env file)
    mongoose.connect(process.env.MONGODB_URL)

        .then(() => {

            // Connection established successfully
            console.log("Connected to DB");
        })

        .catch((error) => {

            // Handle database connection errors
            console.error(
                "Failed to connect to MongoDB:",
                error.message
            );

            // Stop the application if database connection fails
            process.exit(1);
        });
}

// Export the database connection function
module.exports = connectDB;

Interview Explanation:

This file is responsible for connecting the application to MongoDB.
mongoose.connect() uses the MongoDB connection string stored in the .env file.
If the connection is successful, it logs "Connected to DB".
If the connection fails, the error is logged and process.exit(1) terminates the application because the server should not run without a database connection.
The connectDB function is exported so it can be called from server.js before starting the server.


4) User.model.js :: 

const mongoose = require("mongoose");

// ===============================
// User Schema
// Defines the structure of a user document
// in the MongoDB collection
// ===============================
const userSchema = new mongoose.Schema({

    // Username of the user
    username: String,

    // Password of the user
    password: String
});


// ===============================
// Schema Method
// This method will be available on
// every user document instance
// ===============================
userSchema.methods.comparePassword = async function (password) {

    // Compare the entered password
    // with the password stored in the database
    return password === this.password;
};


// ===============================
// Create User Model
// Used to perform database operations
// such as create, find, update, delete
// ===============================
const userModel = mongoose.model(
    "user",
    userSchema
);


// Export the model
module.exports = userModel;

Interview Explanation

What is a Schema?

A schema defines the structure of documents stored in a MongoDB collection.
Here, each user document contains:
username
password

What is a Model?

A model is created from a schema.
It provides methods to interact with the database such as:
create()
findOne()
findById()
updateOne()
deleteOne()

What is comparePassword()?

It is a custom schema method.
Every user document gets access to this method.
During login, it compares the password entered by the user with the password stored in the database.

How is it used?

const user = await userModel.findOne({ username });

const isMatch = await user.comparePassword(password);

In a real production application, passwords should be hashed using bcrypt instead of storing them as plain text.


5) auth.routes.js :: 

const express = require("express");

// Import the User model for database operations
const userModel = require("../models/user.model");

// Create a new router instance
const router = express.Router();


// ===============================
// Register API
// Endpoint: POST /auth/register
// ===============================
router.post('/register', async (req, res) => {

    // Extract user data from the request body
    const { username, password } = req.body;

    // Create a new user document in the database
    const user = await userModel.create({
        username,
        password
    });

    // Send a success response with the created user
    res.status(201).json({
        message: "User Registered Successfully",
        user
    });
});


// ===============================
// Login API
// Endpoint: POST /auth/login
// ===============================
router.post('/login', async (req, res) => {

    // Extract login credentials from the request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await userModel.findOne({
        username
    });

    // Return an error if the user does not exist
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Compare the entered password with the stored password
    const isMatch = await user.comparePassword(password);

    // Return an error if the password is incorrect
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // Send a success response if authentication succeeds
    res.status(200).json({
        message: "User logged in successfully",
        user
    });
});


// Export the router
module.exports = router;


Interview Explanation (Flow)
Register API (POST /auth/register)
Client sends username and password in the request body.
req.body extracts those values.
userModel.create() inserts a new user document into MongoDB.
A 201 Created response is sent back with the created user.
Login API (POST /auth/login)
Client sends username and password.
userModel.findOne() searches for the user by username.
If no user is found → return 404 User not found.
If user exists → call user.comparePassword().
If passwords don't match → return 401 Invalid credentials.
If passwords match → return 200 OK and login success response.
Important Interview Points
express.Router() helps organize routes into separate files.
userModel.create() creates and saves a document in MongoDB.
userModel.findOne() returns the first matching document.
return res.status(...).json(...) stops further execution and sends a response immediately.
Status codes:
201 → Resource created successfully
200 → Request successful
404 → Resource not found
401 → Authentication failed

One improvement you can mention to an interviewer:
In production, passwords should never be stored as plain text. They should be hashed using bcrypt before saving to the database and compared using bcrypt during login.


// Interview Question :: 

Complete Request Flow
Register Flow
Client/Postman
      ↓
POST /auth/register
      ↓
app.js
      ↓
auth.routes.js
      ↓
userModel.create()
      ↓
MongoDB
      ↓
User Stored
      ↓
Response Sent
Login Flow
Client/Postman
      ↓
POST /auth/login
      ↓
Find User
      ↓
Compare Password
      ↓
Valid ?
   ↙       ↘
 No         Yes
 ↓           ↓
401       200 OK
Most Important Interview Questions
Q1. Why use .env file?

Answer:

Sensitive information like database URLs, API keys, JWT secrets should not be hardcoded. We store them inside .env file.

Q2. What is Mongoose?

Answer:

Mongoose is an ODM (Object Document Mapper) used to interact with MongoDB using JavaScript objects.

Q3. What is Schema?

Answer:

Schema defines the structure of documents stored inside MongoDB.

Example:

{
    username:String,
    password:String
}
Q4. What is Model?

Answer:

Model is used to perform database operations such as create, find, update and delete documents.

Q5. Difference between Schema and Model?

Answer:

Schema:

Blueprint

Model:

Tool to interact with database
Q6. Why use express.json()?

Answer:

Express cannot read JSON request bodies by default. express.json() parses incoming JSON and stores it inside req.body.

Q7. What is req.body?

Answer:

req.body contains data sent by client in the request body.

Example:

{
    "username":"tanmay",
    "password":"123"
}
Q8. Why async-await used?

Answer:

Database operations take time. Async-await helps handle asynchronous operations without blocking the server.

Q9. What is userSchema.methods?

Answer:

It adds custom methods to every document created from that schema.

Example:

user.comparePassword()
Q10. What is wrong with this authentication system?

Answer (Very Important):

Currently passwords are stored in plain text.

In production:

Use bcrypt
Hash passwords before storing
Never store raw passwords

This answer impresses interviewers because it shows awareness of security.

One-Line Project Summary (Interview)

"I built a basic authentication system using Express, MongoDB and Mongoose where users can register and log in. User data is stored 
  in MongoDB, routes are organized using Express Router, and custom schema methods are used for password verification. Currently 
  it uses plain-text passwords, but in production I would use bcrypt hashing and JWT-based authentication."

