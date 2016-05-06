var app = require('../server/server.js'),
	fs = require('fs'),
	csv = require('csv'),
	async = require('async'),
	extractData = [];
	extractData2 = [];

var obj = csv();

function restJson(merchantName, merchantId, dcName, city) {
	this.merchantName = merchantName;
	this.merchantId = merchantId;
	this.dcName = dcName;
	this.city = city;
};

obj.from.path('../csv_folder/Restaurants_Dc.csv').to.array(function (data) {

	async.forEach(data, function(item, callback) {
		extractData.push(new restJson(item[1], item[0], item[4], item[2]));
		callback();
	}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log('extractData = ', extractData.length);
			var arrLen = extractData.length/2;
			for(var i = 0; i<arrLen; i++) {
				extractData2.push(extractData[i]);
				extractData.splice(0, 1);
			}
			restaurantData();
		}
	});
});

function restaurantData() {
	console.log('extractData = ', extractData.length, extractData2.length);
	async.forEach(extractData, function(item, cb) {
		app.models.Restaurant.upsert({
			'merchantName': item.merchantName, 
			'merchantId': item.merchantId, 
			'dcName': item.dcName,
			'city': item.city }, cb);
	}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log('inserted  ', extractData.length, ' restaurants');
			addRemaining();
		}
	});
};

function addRemaining() {
	async.forEach(extractData2, function(item, cb) {
		app.models.Restaurant.upsert({
			'merchantName': item.merchantName, 
			'merchantId': item.merchantId, 
			'dcName': item.dcName,
			'city': item.city }, cb);
	}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log('inserted remaining ', extractData.length, ' restaurants');
		}
	});
}