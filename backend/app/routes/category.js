'use strict';

const express = require('express');
const categoryController = require('../controllers/category.controller');
let router = express.Router();

router.route('/') //fix
    .get(categoryController.getCategoryList);

router.route('/add')
    .post(categoryController.addCategory);

module.exports = router;