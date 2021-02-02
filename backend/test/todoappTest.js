var sinon = require('sinon');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = require('chai').should();
const app = require("../server");

chai.use(chaiHttp);

var mongoose = require('mongoose');
require('sinon-mongoose');
const conn = require('../db');

var Todo = require('../app/models/todo.model');
var Category = require('../app/models/category.model');
const { before, after } = require('mocha');

describe('To Do App', function (){
    describe('TD1001 - Retrieve All To-do items', function() {
        var TodoMock = sinon.mock(Todo);
        before((done) => {
            var result = [
                {
                    "_id": "600e2623a57df004b4b4137e",
                    "description": "Jedi Seminar",
                    "category": "Training",
                    "priority": "Medium",
                    "completed": false,
                    "__v": 0
                },
                {
                    "_id": "601239894e7a56078132c106",
                    "description": "Jedi Talks",
                    "category": "Relax",
                    "priority": "Low",
                    "completed": true,
                    "__v": 0
                },
                {
                    "_id": "60125d9e30aef60e40b4b87d",
                    "description": "Jedi Study",
                    "category": "Study",
                    "priority": "High",
                    "completed": false,
                    "__v": 0
                }
            ];

            TodoMock.expects('find').yields(null, result);
            done();
        });

        after((done) => {
            TodoMock.restore();
            done();
        });

        it('TD1001 - Successfully retrieved to-do items', (done) => {
            chai.request(app)
                .get('/todos')
                .end((err, response) => {
                    var checkObj = [
                        {
                            "_id": "600e2623a57df004b4b4137e",
                            "description": "Jedi Seminar",
                            "category": "Training",
                            "priority": "Medium",
                            "completed": false,
                            "__v": 0
                        },
                        {
                            "_id": "601239894e7a56078132c106",
                            "description": "Jedi Talks",
                            "category": "Relax",
                            "priority": "Low",
                            "completed": true,
                            "__v": 0
                        },
                        {
                            "_id": "60125d9e30aef60e40b4b87d",
                            "description": "Jedi Study",
                            "category": "Study",
                            "priority": "High",
                            "completed": false,
                            "__v": 0
                        }
                    ];

                    response.should.have.status(200);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD1002 - Retrieve All To-do items', function() {
        var TodoMock = sinon.mock(Todo);
        before((done) => {
            var result = {status: false, error: "Something went wrong"};

            TodoMock.expects('find').yields(result, null);
            done();
        });

        after((done) => {
            TodoMock.restore();
            done();
        });

        it('TD1002 - Unsuccessfully retrieved to-do items', (done) => {
            chai.request(app)
                .get('/todos')
                .end((err, response) => {
                    var checkObj = {'error_message': 'Failed to fetch To-do List'};

                    response.should.have.status(404);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD2001 - Add new To-do item', function() {
        var TodoMock = sinon.mock(Todo);
        before((done) => {
            var result = [{status: true}];

            TodoMock.expects('insertMany').yields(null, result)
            done();
        });

        after((done) => {
            TodoMock.restore();
            done();
        });

        it('TD2001 - Successfully add new to-do item', (done) => {
            chai.request(app)
                .post('/todos/add')
                .end((err, response) => {
                    var checkObj = {'message': 'To-do item added successfully'};

                    response.should.have.status(200);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD2002 - Add new To-do item', function() {
        var TodoMock = sinon.mock(Todo);
        before((done) => {
            var result = {status: false, error: "Something went wrong"};

            TodoMock.expects('insertMany').yields(result, null)
            done();
        });

        after((done) => {
            TodoMock.restore();
            done();
        });

        it('TD2002 - Unsuccessfully add new to-do item', (done) => {
            chai.request(app)
                .post('/todos/add')
                .end((err, response) => {
                    var checkObj = {'error_message':'Failed to Add Item'};

                    response.should.have.status(400);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD3001 - Edit To-do item', function() {
        var TodoMock = sinon.mock(Todo);
        before((done) => {
            var result = {status: true};

            TodoMock.expects('updateOne').yields(null, result)
            done();
        });

        after((done) => {
            TodoMock.restore();
            done();
        });

        it('TD3001 - Successfully edit to-do item', (done) => {
            chai.request(app)
                .post('/todos/update/6018f25006369c1839ec7539')
                .end((err, response) => {
                    var checkObj = {'message': 'To-do item updated!'};

                    response.should.have.status(200);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD3002 - Add new To-do item', function() {
        var TodoMock = sinon.mock(Todo);
        before((done) => {
            var result = {status: false, error: "Something went wrong"};

            TodoMock.expects('updateOne').yields(result, null)
            done();
        });

        after((done) => {
            TodoMock.restore();
            done();
        });

        it('TD3002 - Unsuccessfully edit item', (done) => {
            chai.request(app)
                .post('/todos/update/6018f25006369c1839ec7539')
                .end((err, response) => {
                    var checkObj = {'error_message':'Failed to Update To-do Item'};

                    response.should.have.status(400);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD4001 - Delete To-do item', function() {
        var TodoMock = sinon.mock(Todo);
        before((done) => {
            var result = {status: true};

            TodoMock.expects('findByIdAndDelete').yields(null)
            done();
        });

        after((done) => {
            TodoMock.restore();
            done();
        });

        it('TD4001 - Successfully delete to-do item', (done) => {
            chai.request(app)
                .put('/todos/delete/600e2623a57df004b4b4137e')
                .end((err, response) => {
                    var checkObj = {'message': 'To-do item deleted successfully'};

                    response.should.have.status(200);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD4002 - Delete To-do item', function() {
        var TodoMock = sinon.mock(Todo);
        before((done) => {
            var result = {status: false, error: "Something went wrong"};

            TodoMock.expects('findByIdAndDelete').yields(result)
            done();
        });

        after((done) => {
            TodoMock.restore();
            done();
        });

        it('TD4002 - Unsuccessfully delete to-do item', (done) => {
            chai.request(app)
                .put('/todos/delete/600e2623a57df004b4b4137e')
                .end((err, response) => {
                    var checkObj = {'error_message':'Failed to Delete To-do Item'};

                    response.should.have.status(400);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD1001 - Retrieve All Categories', function() {
        var CategoryMock = sinon.mock(Category);
        before((done) => {
            var result = [
                {
                    "_id": "600a4444d661311214dcbe09",
                    "name": "Work",
                    "__v": 0
                },
                {
                    "_id": "600a446dd661311214dcbe0a",
                    "name": "Training",
                    "__v": 0
                },
                {
                    "_id": "6010e41f9c42b708ed8c7848",
                    "name": "Relax",
                    "__v": 0
                },
                {
                    "_id": "60125d9630aef60e40b4b87c",
                    "name": "Study",
                    "__v": 0
                }
            ];

            CategoryMock.expects('find').yields(null, result);
            done();
        });

        after((done) => {
            CategoryMock.restore();
            done();
        });

        it('TD5001 - Successfully retrieved category list', (done) => {
            chai.request(app)
                .get('/categories')
                .end((err, response) => {
                    var checkObj = [
                        {
                            "_id": "600a4444d661311214dcbe09",
                            "name": "Work",
                            "__v": 0
                        },
                        {
                            "_id": "600a446dd661311214dcbe0a",
                            "name": "Training",
                            "__v": 0
                        },
                        {
                            "_id": "6010e41f9c42b708ed8c7848",
                            "name": "Relax",
                            "__v": 0
                        },
                        {
                            "_id": "60125d9630aef60e40b4b87c",
                            "name": "Study",
                            "__v": 0
                        }
                    ];

                    response.should.have.status(200);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD5002 - Retrieve All Categories', function() {
        var CategoryMock = sinon.mock(Category);
        before((done) => {
            var result = {status: false, error: "Something went wrong"};

            CategoryMock.expects('find').yields(result, null);
            done();
        });

        after((done) => {
            CategoryMock.restore();
            done();
        });

        it('TD5002 - Unsuccessfully retrieved category list', (done) => {
            chai.request(app)
                .get('/categories')
                .end((err, response) => {
                    var checkObj = {'error_message': 'Failed to fetch Category List'};

                    response.should.have.status(404);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD6001 - Add new Category', function() {
        var CategoryMock = sinon.mock(Category);
        before((done) => {
            var result = [{status: true}];

            CategoryMock.expects('insertMany').yields(null, result)
            done();
        });

        after((done) => {
            CategoryMock.restore();
            done();
        });

        it('TD6001 - Successfully add new category', (done) => {
            chai.request(app)
                .post('/categories/add')
                .end((err, response) => {
                    var checkObj = {'message': 'Category item added successfully'};

                    response.should.have.status(200);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });

    describe('TD6002 - Add new Category', function() {
        var CategoryMock = sinon.mock(Category);
        before((done) => {
            var result = {status: false, error: "Something went wrong"};

            CategoryMock.expects('insertMany').yields(result, null)
            done();
        });

        after((done) => {
            CategoryMock.restore();
            done();
        });

        it('TD6002 - Unsuccessfully add new category', (done) => {
            chai.request(app)
                .post('/categories/add')
                .end((err, response) => {
                    var checkObj = {'message': 'Failed to Add Category Item'};

                    response.should.have.status(400);
                    response.body.should.be.eql(checkObj);
                    done();
                })
        });
    });
});