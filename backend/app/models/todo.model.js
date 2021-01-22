const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  description: {
    type: String
  },
  category: {
    type: String
  },
  priority: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

module.exports = mongoose.model('Todo', TodoSchema);