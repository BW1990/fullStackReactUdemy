const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
});

// environment variable provided by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
