const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chefSchema = new Schema ({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 5 },
        displayName: { type: String }
})

module.exports = Chef = mongoose.model('chef', chefSchema)