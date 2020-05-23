const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chefCardSchema = new Schema ({
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'chef', required: true},
  name: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String, required: true},
})

module.exports = mongoose.model("chefCard", chefCardSchema)