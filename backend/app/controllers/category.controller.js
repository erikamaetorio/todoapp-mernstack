'use strict';

let Category = require('../models/category.model');

exports.getCategoryList = (req, res) => { 
    Category.find(function(err, categories) {
        if (err) {
            res.status(404).json({'error_message': 'Failed to fetch Category List'});
        } else {
            res.status(200).json(categories);
        }
    });
}

exports.addCategory = (req, res) => {
    Category.insertMany(req.body, function(err, category) {
        if(err) {
            res.status(400).json({'message': 'Failed to Add Category Item'});
        } else { 
            res.status(200).json({'message': 'Category item added successfully'});
        }
    });
}