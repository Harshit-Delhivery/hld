var app = require('../server/server.js'),
	async = require('async');

var src = ['Chaayos', 'Limetray', 'Modern Bazzar', 'Opinio', 'Yumist', 'Zomato'];

async.forEach(src, function(item, callback) {
	console.log(item);
	app.models.Source.upsert({'name': item},
		callback, function(error) {
			console.log('dataentry error = ', error);
	});
});