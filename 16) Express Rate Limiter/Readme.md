# Day 26 - Express Rate Limiter

This project demonstrates how to protect an Express.js application from too many requests using `express-rate-limit`.

## What you will learn

- How rate limiting works in API development
- How to prevent abuse and brute-force attacks
- How to configure request limits for each IP address
- How to return friendly messages when a limit is exceeded

## Project structure

- `app.js` - Starts the Express server and applies the rate limiter
- `package.json` - Lists the project dependencies

## Installation

```bash
cd "Day 26 - Express Rate Limiter"
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

## Test the rate limiter

Open the application in your browser or use a tool like Postman, then send many requests quickly.

Example route:

```text
GET http://localhost:3000/
```

By default, this project allows up to 100 requests per 15-minute window for each IP address.

If the limit is exceeded, the server returns:

```text
Too many requests from this IP, please try again after 15 minutes
```

## Concept explanation

A rate limiter controls how many requests a client can make in a given time window.

In this example:

- `windowMs: 15 * 60 * 1000` means 15 minutes
- `max: 100` means 100 requests per IP per 15-minute window
- `message` is shown when the client exceeds the limit

This is useful for:

- Preventing API abuse
- Reducing server load
- Protecting login and authentication endpoints
- Improving overall application stability

## Why this matters

Without rate limiting, an application can be overwhelmed by repeated requests from a single source. Limiting requests helps keep the server responsive and secure.

---

This folder is a beginner-friendly example of API protection using Express Rate Limiter.
