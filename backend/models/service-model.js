const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'chef', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  cost : { type: Number, required: true }
})

module.exports = mongoose.model("service", serviceSchema)