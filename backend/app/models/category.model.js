const mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
  name: {
      type: String
  },
  color: {
      type: String
  }
});

module.exports = mongoose.model('Category', CategorySchema);