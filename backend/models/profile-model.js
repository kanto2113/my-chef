const mongoose = require("mongoose")

const Schema = mongoose.Schema

const profileSchema = new Schema({
  locationCity: String,
  locationState: String,
  zipCode: Number,
  lat: Number,
  lng: Number,
  bio: String,
  profilePicture: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "service" }],
})

module.exports = mongoose.model("profile", profileSchema)
