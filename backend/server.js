const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

const config = require("./config");

let Todo = require('./todo.model');

app.use(cors());

app.use(express.urlencoded({ extended: true})); //parses application/x-www-form-urlencoded requests
app.use(express.json()); //parses json request

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if(!error) {
    console.log("Connected to MongoDB");
  } else {
    console.log(error);
  }
});

todoRoutes.route('/').get(function(req, res) {
  Todo.find(function(err, todos) {
      if (err) {
          console.log(err);
      } else {
          res.json(todos);
      }
  });
});

todoRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
      res.json(todo);
  });
});

todoRoutes.route('/update/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
      if (!todo)
          res.status(404).send("data is not found");
      else
          todo.description = req.body.description;
          todo.assigned = req.body.assigned;
          todo.priority = req.body.priority;
          todo.completed = req.body.completed;

          todo.save().then(todo => {
              res.json('To-do item updated!');
          })
          .catch(err => {
              res.status(400).send("Update Error");
          });
  });
});

todoRoutes.route('/add').post(function(req, res) {
  let todo = new Todo(req.body);
  todo.save()
      .then(todo => {
          res.status(200).json({'message': 'To-do item added successfully'});
      })
      .catch(err => {
          res.status(400).send('Add Error');
      });
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});