const mongoose = require("mongoose")

const Schema = mongoose.Schema

const chefProfileSchema = new Schema({
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'chef', required: true},
  locationCity: { type: String },
  locationState: { type: String },
  bio: { type: String },
  profilePicture: { type: String },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'service'}]
})

module.exports = mongoose.model("chefProfile", chefProfileSchema )