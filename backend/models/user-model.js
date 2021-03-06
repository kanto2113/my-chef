const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "profile" },
})

module.exports = mongoose.model("user", userSchema)
