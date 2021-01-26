'use strict';

let Todo = require('../models/todo.model');

exports.getList = (req, res) => {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
            res.status(404).json({'error_message': 'Failed to fetch To-do List'});
        } else {
            res.status(200).json(todos);
        }
    });
};

exports.getItem = (req, res) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
} //remove

exports.updateItem = (req, res) => {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).json({'error_message':'To-do Item not found'});
        else
            todo.description = req.body.description;
            todo.category = req.body.category;
            todo.priority = req.body.priority;
            todo.completed = req.body.completed;

            todo.save().then(todo => {
                res.json({'message': 'To-do item updated!'});
            })
            .catch(err => {
                res.status(400).json({'error_message':'Failed to Update To-do Item'});
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
            res.status(400).json({'error_message':'Failed to Add Item'});
        });
}

exports.deleteItem = (req, res) => {
    Todo.deleteOne(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.status(400).json({'error_message':'Failed to Delete To-do Item'})
        } else {
            res.status(200).json({'message': 'To-do item deleted successfully'});
        }
    });
}