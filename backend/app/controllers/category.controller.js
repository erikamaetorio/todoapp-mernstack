'use strict';

let Category = require('../models/category.model');

exports.getCategoryList = (req, res) => { 
    Category.find(function(err, categories) {
        if (err) {
            console.log(err);
        } else {
            res.json(categories);
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
            res.status(400).send('Add Error');
        });
}