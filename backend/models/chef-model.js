const mongoose = require("mongoose")

const Schema = mongoose.Schema

const chefSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  profilePicture: { type: String },
})

module.exports = mongoose.model("chef", chefSchema)
