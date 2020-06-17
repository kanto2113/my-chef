const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
  title: { type: String },
  description: { type: String },
  cost : { type: Number }
})

module.exports = mongoose.model("service", serviceSchema)