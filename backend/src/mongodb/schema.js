const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const usersAdmin = mongoose.model('UserAdmin', userAdminSchema);

module.exports = userAdmin;