const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const publicPath = path.join(__dirname, '/public');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.get('/users/login', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  console.log('Magic is happening on port 3000');
});
