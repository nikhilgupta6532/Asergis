module.exports = (app, publicPath) => {
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

  app.listen(3000, () => {
    console.log('Magic is happening on port 3000');
  });
};
