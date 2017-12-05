const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: false
    },
    city: {
        type: String,
        require: false
    },
    country: {
        type: String,
        require: false
    },
    zip: {
        type: String,
        require: false
    }
    // cart: {
    //     type: String,
    //     required: false
    // }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

// module.exports.getUserByUsername = function (username, callback) {
//     const query = { username: username }
//     User.findOne(query, callback);
// }

module.exports.getUserByEmail = function (email, callback) {
    const query = { email: email }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {                 //genSalt = a random key how gonna hash the password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}