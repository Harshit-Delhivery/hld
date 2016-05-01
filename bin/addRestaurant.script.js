var app = require('../server/server.js'),
	fs = require('fs'),
	csv = require('csv'),
	async = require('async'),
	extractData = [];

var obj = csv();

function restJson(merchantName, merchantId, hub, city) {
	this.merchantName = merchantName;
	this.merchantId = merchantId;
	this.hub = hub;
	this.city = city;
};

obj.from.path('../csv_folder/Restaurants.csv').to.array(function (data) {

	async.forEach(data, function(item, callback) {
		extractData.push(new restJson(item[1], item[0], item[2], item[3]));
		callback();
	}, function(err) {
		if(err) {
			throw err;
		} else {
			restaurantData();
		}
	});
});

function restaurantData() {
	async.forEach(extractData, function(item, callback) {
		app.models.Restaurant.upsert({
			'merchantName': item.merchantName, 
			'merchantId': item.merchantId, 
			'hub': item.hub,
			'city': item.city }, callback);
	}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log('inserted  ', extractData.length, ' restaurants');
		}
	});
};