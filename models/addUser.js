const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (req, res, data) => {
  console.log('Data of a new user', data);

  const emailId = data.emailId.toLowerCase();

  const fullName = data.fullName;

  const password = data.password;

  const userName = data.userName;

  //const user = await new User({ fullName, emailId, password, userName }).save();

  if (fullName == null || password == null || userName == null) {
    res.send({
      msg: 'Please fill all parameters'
    });
  } else {
    console.log('inside else');
    require('../secret/hashing')(password, hashedPassword => {
      console.log(hashedPassword);
      new User({ fullName, emailId, password: hashedPassword, userName })
        .save()
        .then(
          user => {
            res.redirect('/login');
          },
          err => {
            res.send(err);
          }
        );
    });
  }
};
