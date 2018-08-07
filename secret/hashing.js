const bcrypt = require('bcryptjs');

module.exports = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(hash);
    });
  });
};
