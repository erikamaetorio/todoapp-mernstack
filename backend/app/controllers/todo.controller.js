'use strict';

let Todo = require('../models/todo.model');

exports.getList = (req, res) => {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
};

exports.getItem = (req, res) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
}

exports.updateItem = (req, res) => {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.description = req.body.description;
            todo.category = req.body.category;
            todo.priority = req.body.priority;
            todo.completed = req.body.completed;

            todo.save().then(todo => {
                res.json('To-do item updated!');
            })
            .catch(err => {
                res.status(400).send("Update Error");
            });
    });
}

exports.addItem = (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'message': 'To-do item added successfully'});
        })
        .catch(err => {
            res.status(400).send('Add Error');
        });
}