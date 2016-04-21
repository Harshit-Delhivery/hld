var app = require('../server/server.js'),
	fs = require('fs'),
	csv = require('csv'),
	EventEmitter = require('events'),
	async = require('async'),
	extractData = [];

var obj = csv();
	// myEvent = new EventEmitter();

function restJson(merchantName, merchantId, dcName, city) {
	this.merchantName = merchantName;
	this.merchantId = merchantId;
	this.dcName = dcName;
	this.city = city;
};

obj.from.path('../csv_folder/Restaurants.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        // console.log(data);
        extractData.push(new restJson(data[index][1], data[index][0], data[index][2], data[index][3]));
    }
    if(index == data.length) {
    	restaurantData();
    }
    // console.log('restaurant csv file = ', extractData);
});

function restaurantData() {
	var arr = [];
	async.forEach(extractData, function(item, callback) {
		console.log(arr.push(item).length);
		app.models.Restaurant.upsert({
			'merchantName': item.merchantName, 
			'merchantId': item.merchantId, 
			'dcName': item.dcName,
			'city': item.city }, callback);
	}, function(err) {
		if(err)
			throw err;
	});
};

// (function() {
// 		console.log('restaurant csv file = ', extractData);
// 		var extractData;
// 		extractData.map(function(item) {
// 			restaurants(item);
// 		});
// })();