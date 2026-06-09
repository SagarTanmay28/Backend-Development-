Day 7 - Authentication

│
├── server.js
│
├── src
│   │
│   ├── app.js
│   │
│   ├── db
│   │   └── db.js
│   │
│   ├── models
│   │   └── user.model.js
│   │
│   └── routes
│       └── auth.routes.js
│
├── .env
│
├── package.json
└── node_modules


1) Server.js 

// Load environment variables from the .env file
// Sensitive information such as database URLs,
// API keys, and secrets are stored here
// Example:
// MONGODB_URL=...
// JWT_SECRET=...

require('dotenv').config();


// Import the Express application
const app = require("./src/app");


// Import the database connection function
const connectDB = require("./src/db/db");


// Establish a connection with the MongoDB database
// The application should connect to the database
// before handling incoming requests
connectDB();


// Start the server on port 3000
app.listen(3000, () => {

    console.log("Server is running on port 3000");
});

Interview Explanation
Responsibility of server.js

This file acts as the entry point of the application.

Execution Flow
Load Environment Variables
require('dotenv').config() loads variables from the .env file into process.env.
This keeps sensitive information separate from the source code.
Import Express Application
Imports the Express app configured in app.js.
The app contains middleware and route registrations.
Import Database Connection Function
Imports connectDB() from the database module.
Connect to MongoDB
connectDB() establishes the database connection before serving requests.
Start the Server
app.listen(3000) starts the Node.js server.
The server listens for incoming HTTP requests on port 3000.
Architecture Flow
server.js
    │
    ├── Load .env variables
    │
    ├── Connect to MongoDB
    │
    ├── Import Express App
    │
    └── Start Server (Port 3000)
                │
                ▼
             app.js
                │
                ▼
          Authentication Routes
                │
                ▼
            User Model
                │
                ▼
             MongoDB

One-line interviewer answer:

server.js is the application's entry point. It loads environment variables, establishes the MongoDB connection,
imports the Express application, and starts the server to handle incoming requests.


const express = require("express");

// Import authentication routes
const authRoutes = require("./routes/auth.routes");

// Import cookie-parser middleware
const cookieParser = require("cookie-parser");

// Create an Express application instance
const app = express();


// ===============================
// Cookie Parser Middleware
// ===============================

// Parses cookies sent by the client
// Parsed cookies become available in req.cookies
app.use(cookieParser());


// ===============================
// JSON Parser Middleware
// ===============================

// Parses incoming JSON request bodies
// Parsed data becomes available in req.body
app.use(express.json());


// ===============================
// Routes
// ===============================

/*
    Authentication Routes

    POST /auth/register
    POST /auth/login
    GET  /auth/user
*/
app.use('/auth', authRoutes);


// Export the Express application
module.exports = app;
Interview Explanation
Responsibility of app.js

This file is responsible for:

Creating the Express application.
Registering middleware.
Registering routes.
Exporting the app instance.
Step-by-Step Flow
1. Create Express App
const app = express();
Creates the main Express application object.
All middleware and routes are attached to this object.
2. Register Cookie Parser Middleware
app.use(cookieParser());
Reads cookies sent by the client.
Stores parsed cookies inside:
req.cookies

Example:

Cookie: token=abc123

After parsing:

req.cookies = {
    token: "abc123"
}

Useful for:

JWT Authentication
Session Management
Remember Me functionality
3. Register JSON Middleware
app.use(express.json());

Converts JSON request bodies into JavaScript objects.

Incoming request:

{
    "username": "tanmay",
    "password": "123456"
}

Becomes:

req.body = {
    username: "tanmay",
    password: "123456"
}

Without this middleware:

req.body === undefined
4. Register Authentication Routes
app.use('/auth', authRoutes);

All routes defined in auth.routes.js are prefixed with /auth.

Examples:

/auth/register
/auth/login
/auth/user
Request Flow
Client Request
      │
      ▼
app.js
      │
      ├── cookieParser()
      │
      ├── express.json()
      │
      └── /auth Routes
              │
              ▼
       auth.routes.js
              │
              ▼
         userModel
              │
              ▼
          MongoDB
One-Line Interview Answer

app.js creates the Express application, registers middleware such as cookie-parser and express.json, mounts application routes,
and exports the configured app instance for the server to use.

3) Db.js :: 

const mongoose = require("mongoose");

// ===============================
// Database Connection Function
// ===============================

function connectDB() {

    // Connect to MongoDB using the connection string
    // stored in the environment variables
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

            // Stop the application if the database connection fails
            process.exit(1);
        });
}

// Export the database connection function
module.exports = connectDB;


Interview Explanation
Responsibility of db.js

This file is responsible for:

Establishing a connection with MongoDB.
Handling connection success and failure.
Exporting the connection function for use in server.js.
Step-by-Step Flow
1. Import Mongoose
const mongoose = require("mongoose");
Mongoose is an ODM (Object Data Modeling) library for MongoDB.
It helps interact with MongoDB using JavaScript objects instead of raw database queries.
2. Create Database Connection Function
function connectDB() {
A separate function is created so the connection logic remains modular and reusable.
3. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
Uses the connection string stored in the .env file.
Establishes a connection between the Node.js application and MongoDB.

Example:

MONGODB_URL=mongodb://localhost:27017/cohort
4. Handle Successful Connection
.then(() => {
    console.log("Connected to DB");
})
Executes when MongoDB connection is established successfully.
Useful for verifying that the database is ready before serving requests.
5. Handle Connection Errors
.catch((error) => {
Executes if MongoDB connection fails.
console.error(
    "Failed to connect to MongoDB:",
    error.message
);
Prints the error message for debugging.
6. Stop the Application
process.exit(1);
Terminates the Node.js process.
Exit code 1 indicates an error.
Prevents the server from running without a database connection.
Execution Flow
server.js
    │
    ▼
connectDB()
    │
    ▼
mongoose.connect()
    │
    ├── Success
    │       │
    │       ▼
    │   Connected to DB
    │
    └── Failure
            │
            ▼
      Error Message
            │
            ▼
      process.exit(1)
Common Interview Question

Q: Why do we call process.exit(1) if the database connection fails?

Answer:

Because the application depends on the database. If MongoDB is unavailable, most API operations will fail. It's better to stop the server immediately rather than run in a broken state.

One-Line Interview Answer

db.js centralizes MongoDB connection logic using Mongoose, handles connection success and failure,
and ensures the application only runs when the database connection is established successfully.


4) user.model.js :: 

const mongoose = require("mongoose");

// ===============================
// User Schema
// Defines the structure of documents
// stored in the users collection
// ===============================
const userSchema = new mongoose.Schema({

    // Username of the user
    username: String,

    // Password of the user
    password: String
});


// ===============================
// Custom Schema Method
// This method will be available on
// every user document instance
// ===============================
userSchema.methods.comparePassword =
async function (password) {

    // Compare the incoming password
    // with the password stored in the database
    return password === this.password;
};


// ===============================
// Create User Model
// Used to perform database operations
// such as create, find, update, and delete
// ===============================
const userModel =
    mongoose.model("user", userSchema);


// Export the model
module.exports = userModel;



Interview Explanation
Responsibility of user.model.js

This file is responsible for:

Defining the structure of a User document.
Creating a Mongoose model from the schema.
Adding custom methods to user documents.
Exporting the model for use throughout the application.
Step 1: Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

A schema defines how data will be stored in MongoDB.

Current user document structure:

{
    "_id": "...",
    "username": "tanmay",
    "password": "123456"
}

Every document in the users collection follows this structure.

Step 2: Add Custom Method
userSchema.methods.comparePassword =
async function(password){
    return password === this.password;
};

This creates a custom method available on every user document.

Example:

const user =
await userModel.findOne({ username });

const isMatch =
await user.comparePassword(password);

Here:

password → entered by the user.
this.password → stored in MongoDB.

Returns:

true

or

false

depending on whether the passwords match.

Step 3: Create Model
const userModel =
    mongoose.model("user", userSchema);

The model acts as an interface between Node.js and MongoDB.

Using the model you can perform operations such as:

userModel.create()
userModel.findOne()
userModel.find()
userModel.findById()
userModel.updateOne()
userModel.deleteOne()
Step 4: Export Model
module.exports = userModel;

Allows the model to be imported into route files and other modules.

Example:

const userModel =
require("../models/user.model");
Request Flow
Client Request
      │
      ▼
auth.routes.js
      │
      ▼
userModel
      │
      ▼
userSchema
      │
      ▼
MongoDB Collection (users)
Common Interview Questions

Q: What is a Schema?

A schema defines the structure, fields, and behavior of documents stored in a MongoDB collection.

Q: What is a Model?

A model is created from a schema and provides methods to perform CRUD operations on the database.

Q: Why use Schema Methods?

Schema methods allow us to attach reusable business logic directly to document instances, keeping the code clean and organized.

Q: Why is this.password used?

this refers to the current user document returned from MongoDB, so this.password accesses that user's stored password.

Production Improvement

In a real application, passwords should not be stored in plain text. Instead, they should be hashed using bcrypt and compared securely during login.

One-Line Interview Answer

user.model.js defines the User schema, adds custom document methods, creates the Mongoose model, 
and provides an interface for performing database operations on the users collection.


5) auth.routes.js :: 

const express = require("express");

// Import the User model for database operations
const userModel = require("../models/user.model");

// Import JWT package for token generation and verification
const jwt = require("jsonwebtoken");

// Create a new router instance
const router = express.Router();


// ===============================
// Register API
// Endpoint: POST /auth/register
// ===============================
router.post('/register', async (req, res) => {

    // Extract username and password from the request body
    const { username, password } = req.body;

    // Create a new user document in the database
    const user = await userModel.create({
        username,
        password
    });

    // Generate a JWT token containing the user id
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    );

    // Store the token in a cookie
    res.cookie("token", token);

    // Send a success response
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

    // Verify the entered password
    const isMatch = await user.comparePassword(password);

    // Return an error if the password is incorrect
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // Generate a JWT token
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    );

    // Send a success response with the token
    res.status(200).json({
        message: "User logged in successfully",
        user,
        token
    });
});


// ===============================
// Protected Route
// Endpoint: GET /auth/user
// ===============================
router.get('/user', async (req, res) => {

    // Extract the token from cookies
    const { token } = req.cookies;

    // Return an error if no token is provided
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {

        // Verify and decode the JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find the user using the decoded user id
        const user = await userModel.findOne({
            _id: decoded.id
        });

        // Return the authenticated user's data
        res.status(200).json({
            message: "Token is valid",
            user
        });

    } catch (err) {

        // Handle invalid or expired tokens
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
});


// Export the router
module.exports = router;


Interview Explanation
Responsibility of auth.routes.js

This file handles:

User Registration
User Login
JWT Token Generation
Authentication using JWT
Protected Route Access
Register Flow (POST /auth/register)
Client
  │
  ▼
Send username + password
  │
  ▼
Create User in MongoDB
  │
  ▼
Generate JWT Token
  │
  ▼
Store Token in Cookie
  │
  ▼
Send Success Response
JWT Generation
const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
);

The token contains:

{
    "id": "user_id"
}

and is signed using the secret key.

Login Flow (POST /auth/login)
Client
  │
  ▼
Send username + password
  │
  ▼
Find User
  │
  ▼
Compare Password
  │
  ▼
Generate JWT
  │
  ▼
Send Success Response
Password Verification
const isMatch =
    await user.comparePassword(password);

Returns:

true

or

false

depending on whether the password matches.

Protected Route (GET /auth/user)

This route can only be accessed by authenticated users.

Flow
Client Request
      │
      ▼
Read Cookie
      │
      ▼
Extract Token
      │
      ▼
Verify JWT
      │
      ▼
Extract User ID
      │
      ▼
Fetch User From MongoDB
      │
      ▼
Send User Data
Extract Token
const { token } = req.cookies;

Example:

Cookie: token=eyJhbGciOi...
Verify Token
const decoded =
    jwt.verify(
        token,
        process.env.JWT_SECRET
    );

If valid:

decoded = {
    id: "6845..."
}

If invalid or expired:

throw Error

and execution goes to the catch block.

Find User
const user =
    await userModel.findOne({
        _id: decoded.id
    });

Uses the user id stored inside the JWT payload.

Common Interview Questions
Q1. What is JWT?

JSON Web Token is a compact token used for authentication and authorization. It stores user information in a signed format.

Q2. Why use JWT?
Stateless authentication
No session storage required
Easy to use across frontend and backend
Widely used in modern web applications

Q3. What does jwt.sign() do?

Creates a token using:

Payload
Secret Key
jwt.sign(payload, secret)
  
Q4. What does jwt.verify() do?

Checks:

Token authenticity
Token integrity
Token expiration (if configured)

and returns the decoded payload.

Q5. Why store the token in cookies?

Cookies are automatically sent by the browser with every request, making it convenient for authentication.

One-Line Interview Answer

auth.routes.js manages user authentication by handling registration, login, JWT token generation, 
cookie-based authentication, token verification, and access to protected routes.


What is JWT?

JWT = JSON Web Token

It is used to verify user identity.

Think:

Login Success
      ↓
Server Creates Token
      ↓
Client Stores Token
      ↓
Client Sends Token Again
      ↓
Server Verifies Token
      ↓
Access Granted
What is inside JWT?

Example:

{
    id: "6848abc123"
}

Server signs it using:

JWT_SECRET
What does jwt.sign() do?
jwt.sign(
    {
        id:user._id
    },
    process.env.JWT_SECRET
)

Creates a signed token.

What does jwt.verify() do?
jwt.verify(token,JWT_SECRET)

Checks:

Was token created by our server?
Has token been modified?
Is token valid?
Complete Register Flow
Client
   ↓
POST /auth/register
   ↓
Create User
   ↓
Generate JWT
   ↓
Store JWT In Cookie
   ↓
Response
Complete Login Flow
Client
   ↓
POST /auth/login
   ↓
Find User
   ↓
Compare Password
   ↓
Generate JWT
   ↓
Send Token
Complete Protected Route Flow
Client
   ↓
GET /auth/user
   ↓
Read Cookie
   ↓
Extract Token
   ↓
Verify JWT
   ↓
Get User ID
   ↓
Fetch User
   ↓
Response
Interview Questions
Q1. What is JWT?

Answer:

JWT is a JSON Web Token used for authentication and securely transferring user identity information between client and server.

Q2. Why use JWT?

Answer:

JWT allows stateless authentication. The server does not need to store session data because user information is inside the token.

Q3. What is inside JWT?

Answer:

JWT contains a payload.

Example:

{
   id:"123"
}

It also contains a signature for security.

Q4. Difference between Authentication and Authorization?

Answer:

Authentication:

Who are you?

Authorization:

What are you allowed to do?
Q5. What is cookie-parser?

Answer:

cookie-parser is middleware that reads cookies from incoming requests and stores them inside req.cookies.

Q6. Why do we use req.cookies?

Answer:

To access cookies sent by the browser.

Example:

const { token } = req.cookies;
Q7. Why is /auth/user a protected route?

Answer:

Because it requires a valid JWT token before allowing access.

Q8. What happens if JWT_SECRET changes?

Answer:

All previously generated tokens become invalid because signatures will no longer match.

Q9. What is wrong in this project?

Very Important Interview Answer

Currently passwords are stored in plain text.

In production:

Use bcrypt
Hash Passwords
Never Store Raw Passwords
Q10. Explain this project in one minute.

Answer:

"I built an authentication system using Express, MongoDB, JWT and cookies. Users can register and log in. 
After successful registration or login, the server generates a JWT containing the user id and signs it
using a secret key. The token is stored in cookies. Protected routes verify the token before
  allowing access and fetch user information from MongoDB using the decoded user id."
