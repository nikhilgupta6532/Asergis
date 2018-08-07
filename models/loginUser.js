const keys = require('../config/keys');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('users');
module.exports = (req, res, data) => {
  console.log('Log in data', data);

  const emailId = data.emailId;

  const password = data.password;

  User.findOne({ emailId }).then(
    user => {
      console.log(user.password);
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.send('successfull');
        } else {
          res.send('Password is not correct');
        }
      });
    },
    err => {
      res.send(err);
    }
  );
};
