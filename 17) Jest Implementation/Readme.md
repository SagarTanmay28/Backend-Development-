# Day 27 - Jest Implementation

This project shows how to test an Express.js application using `Jest` and `SuperTest`.

## What you will learn

- How to write automated tests for Node.js applications
- How to test HTTP endpoints without opening a browser
- How to verify that your API behaves correctly
- How to use Jest for basic test-driven development

## Project structure

- `app.js` - Contains the Express application
- `app.test.js` - Contains test cases for the API
- `package.json` - Includes Jest and SuperTest scripts

## Installation

```bash
cd "Day 27 - Jest Implementation"
npm install
```

## Run the tests

```bash
npm test
```

## Watch mode

```bash
npm run test:watch
```

## Example test coverage

This project tests:

- `GET /` returns a successful response with a JSON message
- `GET /non-existing` returns `404 Not Found`

## Concept explanation

Jest is a JavaScript testing framework used to write and run tests.

SuperTest is used to send HTTP requests to the Express app as though a real client were calling it.

This makes it easy to test:

- Status codes
- Response bodies
- Error handling
- Route behavior

## Why this matters

Testing helps you catch bugs early and ensures your application continues to work after changes. It is an essential part of real-world backend development.

---

This folder is a simple introduction to API testing with Jest and SuperTest.
