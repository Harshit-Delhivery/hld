var app = require('../server/server.js'),
	fs = require('fs'),
	csv = require('csv'),
	async = require('async'),
	extractData = [];

var obj = csv();

function toJsonObj(city, dcName, email, password, role) {
	this.dc_name = dcName;
	this.city = city;
	this.email = email;
	this.role = role;
	this.password = password;
	this.created = new Date();
};

obj.from.path('../csv_folder/emails.csv').to.array(function (data) {
	async.forEach(data, function(item, callback) {
		// console.log(item[0], item[2], item[3], item[6]);
		var from = extractData.map(function(itm) {
			return itm.email;
		});

		// console.log(from);

		if(from.indexOf(item[3]) == -1) {
			extractData.push(new toJsonObj(item[0], item[2], item[3], item[6], 'operator'));
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
			'dc_name': item.dc_name,
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
