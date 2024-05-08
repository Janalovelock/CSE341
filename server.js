/* jshint esversion: 6 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Logging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // Log the request method and URL
  next(); // Call next middleware or route handler
});

// Define routes
app.get("/", (req, res) => {
  res.send(`
    <html>
        <head>
            <title>Home Page</title>
        </head>
        <body>
            <h1>Welcome to Jana Lovelock's Page!</h1>
            <p>Click <a href="/name">here</a> to go to the /name directory.</p>
            <p>Click <a href="/contacts">here</a> to go to the /contacts directory.</p>
        </body>
    </html>
`);
});

// Mount the routes
app.use("/", require("./routes"));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Initialize MongoDB connection
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on ${PORT}`);
    });
  }
});