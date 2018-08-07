const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./MongoSchema/user');
mongoose.connect(keys.mongoURI);

const publicPath = path.join(__dirname, '/public');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(publicPath));

require('./routes/authRoutes')(app, publicPath);
