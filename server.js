/* jshint esversion: 6 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
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

app.use("/", require("./routes"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`connected to DB and listening on ${PORT}`);
    });
  }
});
