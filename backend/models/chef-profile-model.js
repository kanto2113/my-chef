const mongoose = require("mongoose")

const Schema = mongoose.Schema

const chefProfileSchema = new Schema({
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'chef', required: true},
  bio: { type: String, required: true},
  services: [],
})

module.exports = mongoose.model("chefProfile", chefProfileSchema )