const mongoose = require("mongoose")

const Schema = mongoose.Schema

const chefSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'chefProfile'}
})

module.exports = mongoose.model("chef", chefSchema)
