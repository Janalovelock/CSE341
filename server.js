const express = require('express');
const app = express();
const nameRoute = require('./routes/nameRoute');


app.get('/', (req, res) => {
    res.send( `
    <html>
        <head>
            <title>Home Page</title>
        </head>
        <body>
            <h1>Welcome to Jana Lovelock's Express web server!</h1>
            <p>Click <a href="/name">here</a> to go to the /name directory.</p>
        </body>
    </html>
`);
  });
  app.use('/', nameRoute);

  const PORT = process.env.PORT || 3000; // Use the PORT environment variable if available, otherwise use port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});