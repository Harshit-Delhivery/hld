var app = require('../server/server.js'),
	fs = require('fs'),
	csv = require('csv'),
	async = require('async'),
	extractData = [];

var obj = csv();

function toJsonObj(city, hub, dcName, dcEmail, clmName, clmEmail) {
	this.city = city;
	this.hub = hub;
	this.dcName = dcName;
	this.dcEmail = dcEmail;
	this.clmName = clmName;
	this.clmEmail = clmEmail;
};

obj.from.path('../csv_folder/dcmapping.csv').to.array(function (data) {
	async.forEach(data, function(item, callback) {
		// console.log(item.length);
		extractData.push(new toJsonObj(item[0], item[1], item[2], item[3], item[4], item[5]));
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
			'hub': item.hub,
			'dcName': item.dcName,
			'dcEmail': item.dcEmail,
			'clmName': item.clmName,
			'clmEmail': item.clmEmail }, callback);
			}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log('done inserting records successfully');
		}
	});
};
