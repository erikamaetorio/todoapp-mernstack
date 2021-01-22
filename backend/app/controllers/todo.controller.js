'use strict';

let Todo = require('../models/todo.model');
let Category = require('../models/category.model');

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

exports.getCategoryList = (req, res) => { //fix
    console.log(req);
    console.log("here");
    Category.find(function(err, categories) {
        if (err) {
            console.log(err);
        } else {
            res.json(categories);
        }
    });
}

exports.completeItem = (req, res) => {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.priority = req.body.priority;
    
            todo.save().then(todo => {
                res.json('To-do item completed!');
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

exports.addCategory = (req, res) => {
    let category = new Category(req.body);
    category.save()
        .then(category => {
            res.status(200).json({'message': 'Category item added successfully'});
        })
        .catch(err => {
            res.status(400).send('Add Error');
        });
}