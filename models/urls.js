const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema({
  originUrl: {
    type: String,
    trim: true
  },
  shorten: {
    type: String,
    trim: true
  }
})

module.exports = mongoose.model('URL', urlSchema)
