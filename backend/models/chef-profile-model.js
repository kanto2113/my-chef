const mongoose = require("mongoose")

const Schema = mongoose.Schema

const chefProfileSchema = new Schema({
  bio: { type: String, required: true, unique: true },
})

module.exports = ChefProfileSchema = mongoose.model("chefProfile", chefProfileSchema )