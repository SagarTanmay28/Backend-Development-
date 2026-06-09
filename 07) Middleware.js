1) app.js

  Responsibility
  Create Express App
  Register App Level Middleware
  Register Routes
  Export App

const express = require("express");

// Router import kiya
// Iske andar saari APIs aur router middleware hai
const indexRoutes = require("./routes/index.routes");


// Express application create ho gayi
const app = express();


// APP LEVEL MIDDLEWARE
// Ye middleware har incoming request ke liye chalega
// Request sabse pehle yaha aayegi

app.use((req,res,next)=>{

    console.log("this middleware is b/w app & route");

    // next() request ko next middleware ya route tak bhejta hai
    next();
});


// Router register kar diya
// '/' se start hone wali requests indexRoutes file me jayengi

app.use('/',indexRoutes);


// app export kar diya
// Taaki server.js ise use kar sake

module.exports = app;





2) Server.js 

  Responsibility
  Start Server
  Listen For Requests

// app.js se express application import ki

const app = require('./src/app');


// Server ko port 3000 pe start kar diya

app.listen(3000,()=>{

    console.log("Server is running on port 3000");
});




3) routes/index.routes.js

  Responsibility
  Create Router
  Register Router Middleware
  Create APIs
  Export Router

const express = require('express');


// Router create kiya
// Router ek mini express application ki tarah hota hai

const router = express.Router();




// ROUTER LEVEL MIDDLEWARE
// Ye middleware router aur API ke beech execute hoga

router.use((req,res,next)=>{

    console.log("this middleware is b/w router & API");


    // Request ko next middleware ya API tak bhej diya
    next();
});






// GET API
// Client jab GET / request bhejega
// Tab ye route execute hoga

router.get('/',(req,res)=>{

    res.json({
        message : "Welcome to the Cohort"
    });
});






// Router export kar diya
// Taaki app.js me use kar sake

module.exports = router;



COMPLETE FLOW ::

Complete Request Flow (Interview Answer)

When user hits:

GET localhost:3000/

            Flow:
            
            Client/Postman
                  ↓
            server.js
                  ↓
            app.js
                  ↓
            App Middleware
                  ↓
            index.routes.js
                  ↓
            Router Middleware
                  ↓
            GET API
                  ↓
            Response

Console Output:

this middleware is b/w app & route

this middleware is b/w router & API

Response:

{
    "message": "Welcome to the Cohort"
}




// Interview Questions :: Interview Questions
Q1. What is Middleware?

Answer:

Middleware is a function that executes between receiving a request and sending a response. It can modify request, response or pass control to the next middleware.

Q2. Why do we use Middleware?

Answer:

We use middleware for:

Authentication
Authorization
Logging
Validation
Error Handling
Parsing JSON
Q3. What is next()?

Answer:

next() passes control to the next middleware or route handler.

Without next(), request gets stuck and API never executes.

Q4. What happens if next() is not called?

Answer:

The request-response cycle stops and the client keeps waiting for a response.

Q5. Difference between app.use() and router.use()?

Answer:

app.use() → Application level middleware.

Runs for entire application

router.use() → Router level middleware.

Runs only for routes inside that router
Q6. In your project, which middleware executes first?

Answer:

App middleware executes first.

Then router middleware executes.

Then API executes.

Flow:

App Middleware
      ↓
Router Middleware
      ↓
Route Handler
Q7. Can middleware modify req object?

Answer:

Yes.

Example:

req.user = {
    id: 1,
    name: "Tanmay"
}

Then next middleware or route can access:

req.user
Q8. What is Express Router?

Answer:

Express Router helps us organize routes into separate files. It acts like a mini Express application.

Q9. Difference between Route Handler and Middleware?

Answer:

Middleware:

(req,res,next)

Uses next().

Route Handler:

(req,res)

Usually sends the final response.

Q10. Explain your middleware project in 30 seconds.

Answer:

"I created an Express application where requests first pass through an application-level middleware and then through a
  router-level middleware before reaching the API. Both middlewares log messages and use next() to forward the request.
  This helped me understand the Express request-response lifecycle and middleware execution order."

