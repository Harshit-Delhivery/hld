var app = require('../server/server.js'),
	fs = require('fs'),
	csv = require('csv'),
	async = require('async'),
	extractData = [];

var obj = csv();

function toJsonObj(city, dcName, email, clmName) {
	this.city = city;
	this.dcName = dcName;
	this.email = email;
	this.clmName = clmName;
};

obj.from.path('../csv_folder/dcmapping.csv').to.array(function (data) {
	async.forEach(data, function(item, callback) {
		// console.log(item.length);
		// City,Hub,DC,DC_email_ID,CLM name,CLM_email_ID
		extractData.push(new toJsonObj(item[0], item[2], item[3], item[4]));
		extractData.push(new toJsonObj(item[0], item[2], item[5], item[4]));
		callback();
	}, function(err) {
		if(err) {
			throw err;
		} else {
			// console.log('done = ', extractData.length);
			insertMapping();
		}
	});
});

function insertMapping() {
	// console.log('inside insertMapping = ', extractData.length);
	async.forEach(extractData, function(item, callback) {
		app.models.Hubmapping.upsert({
			'city': item.city,
			'dcName': item.dcName,
			'email': item.email,
			'clmName': item.clmName }, callback);
			}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log('done inserting records successfully');
		}
	});
};
