'use strict';

const express = require("express");
const todoController = require('../controllers/todo.controller');
let router = express.Router();

router.use((req, res, next) => {
    console.log(req.url, "@", Date.now());
    next();
});

router.route('/')
    .get(todoController.getList);
    
router.route('/:id')
    .get(todoController.getItem);

router.route('/update/:id')
    .post(todoController.updateItem);

router.route('/add')
    .post(todoController.addItem);

module.exports = router;