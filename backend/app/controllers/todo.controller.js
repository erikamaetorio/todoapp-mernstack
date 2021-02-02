'use strict';

let Todo = require('../models/todo.model');

exports.getList = (req, res) => {
    Todo.find(function(err, todos) {
        if (err) {
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
}

exports.updateItem = (req, res) => {
    let id = req.params.id;
    let updateValues = {
        $set:
        {
            description: req.body.description,
            category: req.body.category,
            priority: req.body.priority,
            completed: req.body.completed
        }
    }
    Todo.updateOne({_id: id}, updateValues, function(err, todo) {
        if(err) {
            res.status(400).json({'error_message':'Failed to Update To-do Item'});
        } else { 
            res.status(200).json({'message': 'To-do item updated!'});
        }
    });
}

exports.addItem = (req, res) => {
    Todo.insertMany(req.body, function(err, todo) {
        if(err) {
            res.status(400).json({'error_message':'Failed to Add Item'});
        } else { 
            res.status(200).json({'message': 'To-do item added successfully'});
        }
    });
}

exports.deleteItem = (req, res) => {
    Todo.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            res.status(400).json({'error_message':'Failed to Delete To-do Item'})
        } else {
            res.status(200).json({'message': 'To-do item deleted successfully'});
        }
    });
}