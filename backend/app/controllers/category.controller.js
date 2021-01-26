'use strict';

let Category = require('../models/category.model');

exports.getCategoryList = (req, res) => { 
    Category.find(function(err, categories) {
        if (err) {
            console.log(err);
            res.status(404).json({'error_message': 'Failed to fetch Category List'});
        } else {
            res.status(200).json(categories);
        }
    });
}

exports.addCategory = (req, res) => {
    let category = new Category(req.body);
    category.save()
        .then(category => {
            res.status(200).json({'message': 'Category item added successfully'});
        })
        .catch(err => {
            res.status(400).json({'message': 'Failed to Add Category Item'});
        });
}