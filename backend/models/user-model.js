const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 5 },
        displayName: { type: String },
})

//shorthand for last two lines of character-model.js

module.exports = User = mongoose.model('user', userSchema)