const mongoose = require("mongoose")

const Schema = mongoose.Schema

const serviceSchema = new Schema({
  title: { type: String },
  description: { type: String },
  serviceType: { type: String },
  meals: []
})

module.exports = mongoose.model("service", serviceSchema)
