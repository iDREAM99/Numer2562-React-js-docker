
var express = require('express');
var router = express.Router();
var cors = require('cors')
router.use(cors())
/* GET users listing. */

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test:test@cluster0-uzfpl.azure.mongodb.net/Numer');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var mySchema = mongoose.Schema({
	id: ObjectId,
	key: String,
	fx: String,
	xl: String
});
var MyModel = mongoose.model('MyModel', mySchema, 'Equation');
console.log('connect')
router.get('/', function (req, res, next) {
	var obj = [{ name: 1, fx: 'x+1' }]
	res.json(obj)
});

router.get('/bisection', function (req, res, next) {
	MyModel.find({ key: 'bisection' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});

router.get('/falsePosition', function (req, res, next) {
	MyModel.find({ key: 'falseposition' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/Graphical', function (req, res, next) {
	MyModel.find({ key: 'graphical' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});

router.get('/NewtonRaphson', function (req, res, next) {
	MyModel.find({ key: 'newtonraphson' }, function (err, docs) {
		//console.log(docs)
		res.json(docs)
	})
});
router.get('/Onepoint', function (req, res, next) {
	MyModel.find({ key: 'onepoint' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});

router.get('/Taylor', function (req, res, next) {
	MyModel.find({ key: 'taylor' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/Secant', function (req, res, next) {
	MyModel.find({ key: 'secant' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/Linear', function (req, res, next) {
	MyModel.find({ key: 'linear' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/h', function (req, res, next) {
	MyModel.find({ key: 'h' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/h2', function (req, res, next) {
	MyModel.find({ key: 'h2' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/in', function (req, res, next) {
	MyModel.find({ key: 'in' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});

module.exports = router;

