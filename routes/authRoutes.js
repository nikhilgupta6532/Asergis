const { generateMessage } = require('../utils/message');
const { generateLocationMessage } = require('../utils/message');
const { isRealString } = require('../utils/validation');

module.exports = (app, publicPath, server, io, users) => {
  io.on('connection', socket => {
    console.log('New user connected');
    socket.on('join', (params, callback) => {
      if (!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and room name are required');
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      //socket.leave('The office Fans');
      //io.emit->io.to('The office Fans').emit
      //socket.broadcast.emit->socket.broadcast.to('The office Fans').emit

      socket.emit(
        'newMessage',
        generateMessage('Admin', 'Welcome to the chat app')
      );

      socket.broadcast
        .to(params.room)
        .emit(
          'newMessage',
          generateMessage('Admin', '' + params.name + ' has joined')
        );

      callback();
    });

    socket.on('createMessage', (message, callback) => {
      //console.log('creatMessage',message);
      var user = users.getUser(socket.id);
      if (user && isRealString(message.text)) {
        io.to(user.room).emit(
          'newMessage',
          generateMessage(user.name, message.text)
        );
      }
      callback('This is from the server');
      // socket.broadcast.emit('newMessage',{
      // from: message.from,
      // text:message.text,
      // createdAt:new Date().getTime()
      // })
    });

    socket.on('createLocationMessage', coords => {
      var user = users.getUser(socket.id);
      if (user) {
        io.to(user.room).emit(
          'newLocationMessage',
          generateLocationMessage(user.name, coords.latitude, coords.longitude)
        );
      }
    });

    socket.on('disconnect', () => {
      //console.log('User was disconnected');
      var user = users.removeUser(socket.id);
      if (user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit(
          'newMessage',
          generateMessage('Admin', '' + user.name + ' has left')
        );
      }
    });
  });

  app.get('/users/login', (req, res) => {
    res.sendFile(publicPath + '/index.html');
  });

  app.post('/signUp', (req, res) => {
    var userData = req.body;
    require('../models/addUser')(req, res, userData);
  });

  app.get('/login', (req, res) => {
    res.sendFile(publicPath + '/login.html');
  });

  app.post('/userLogin', (req, res) => {
    var userData = req.body;
    require('../models/loginUser')(req, res, userData);
  });

  app.get('/userDashboard', (req, res) => {
    res.sendFile(publicPath + '/chat.html');
  });

  server.listen(3000, () => {
    console.log('Magic is happening on port 3000');
  });
};
