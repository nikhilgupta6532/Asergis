const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const socketIO = require('socket.io');
const http = require('http');
const { Users } = require('./utils/users');

require('./MongoSchema/user');
mongoose.connect(keys.mongoURI);

const publicPath = path.join(__dirname, '/public');

const app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(publicPath));

require('./routes/authRoutes')(app, publicPath, server, io, users);
