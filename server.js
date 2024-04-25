const express = require('express');
const app = express();
const nameRoute = require('./routes/nameRoute');


app.get('/', (req, res) => {
    res.send('Welcome to my Express web server!');
  });
  app.use('/', nameRoute);

  const PORT = process.env.PORT || 3000; // Use the PORT environment variable if available, otherwise use port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});