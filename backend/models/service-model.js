const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'chef', required: true },
  mealCost : { type: Number, required: true },
  description: { type: String, required: true },
})

module.exports = mongoose.model("service", serviceSchema)