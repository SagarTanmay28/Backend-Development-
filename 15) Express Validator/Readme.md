# Express Validator

This project demonstrates how to validate incoming request data in an Express.js application using `express-validator`.

## What you will learn

- How to validate user input before saving it
- How to use middleware to cleanly separate validation logic
- How to return structured error messages for invalid requests
- How to build safer and more reliable APIs

## Project structure

- `app.js` - Starts the Express server and defines the registration route
- `middleware/validator.middleware.js` - Contains validation rules and the error handler
- `package.json` - Lists the project dependencies

## Installation

Open the project folder and install dependencies:

```bash
cd "Express Validator"
npm install
```

## Run the server

```bash
node app.js
```

The server will start at:

```text
http://localhost:3000
```

## Test the API

### Valid request

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"john\",\"email\":\"john@example.com\",\"password\":\"123456\"}"
```

Expected response:

```json
{
  "message": "Registration successful",
  "user": {
    "username": "john",
    "email": "john@example.com"
  }
}
```

### Invalid request

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"\",\"email\":\"not-an-email\",\"password\":\"123\"}"
```

Expected response:

```json
{
  "errors": [
    {
      "field": "username",
      "message": "Username is required"
    },
    {
      "field": "email",
      "message": "Valid email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters long"
    }
  ]
}
```

## Concept explanation

Express Validator helps you validate the body, params, query, and headers of incoming requests.

In this example:

- `username` must not be empty
- `email` must be a valid email format
- `password` must be at least 6 characters long

The validation rules are written as middleware and executed before the route handler. If validation fails, the API returns a `400 Bad Request` response with useful error messages.

## Why this matters

Validation prevents bad data from entering your application. It improves:

- Security
- Data quality
- API reliability
- User experience

---

This folder is a simple beginner-friendly example of request validation in Express.js.
