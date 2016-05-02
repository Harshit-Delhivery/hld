var app = require('../server/server.js'),
	fs = require('fs'),
	csv = require('csv'),
	async = require('async'),
	extractData = [];

var obj = csv();

function toJsonObj(city, username, email, password, role) {
	this.city = city;
	this.email = email;
	this.role = role;
	this.password = password;
	this.username = username;
	this.created = new Date();
};

obj.from.path('../csv_folder/emails.csv').to.array(function (data) {
	async.forEach(data, function(item, callback) {
		// console.log(item[0], item[2], item[3], item[6]);
		var from = extractData.map(function(itm) {
			return itm.email;
		});

		// console.log(from);

		if(from.indexOf(item[5]) == -1) {
			extractData.push(new toJsonObj(item[0], item[4], item[5], item[7], 'clm'));
			callback();
		} else {
			callback();
		}
		
	}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log('done = ', extractData.length);
			insertMapping();
		}
	});
});

function insertMapping() {
	// console.log('inside insertMapping = ', extractData.length);
	async.forEach(extractData, function(item, callback) {
		app.models.Enduser.create({
			'city': item.city,
			'email': item.email,
			'role': item.role,
			'password': item.password,
			'username': item.username,
			'created': item.created }, callback);
			}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log(extractData.length, ' records inserted successfully');
		}
	});
};
