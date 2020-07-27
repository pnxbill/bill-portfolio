


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: 'Email is required',
    lowercase: true,
    index: true, // Check if exists
    unique: true, // Error if exists
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  name: {
    type: String,
    minlength: [6, 'Minimum name length is 6 characters!']
  },
  username: {
    type: String,
    required: true,
    minlength: [6, 'Minimum username length is 6 characters!']
  },
  password: {
    type: String,
    minlength: [6, 'Minimum password length is 6 characters!'],
    maxlength: [32, 'Maximium password length is 32 characters!'],
    required: true
  },
  role: {
    enum: ['guest', 'admin', 'instructor'],
    type: String,
    required: true,
    default: 'guest'
  },
  info: String,
  createdAt: { type: Date, default: Date.now }
})

// pre function is executed before user is stored to database
// used to transform user password in hash before storing into database
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);  // Tell mongoose I have an error
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();  // Tell mongoose that it can store the user
    })
  })
})

module.exports = mongoose.model('User', userSchema);