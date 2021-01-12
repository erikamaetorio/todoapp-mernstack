const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  description: {
    type: String
  },
  assigned: {
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