var app = require('../server/server.js'),
	async = require('async');

var src = ['Chaayos', 'Limetray', 'Modern Bazzar', 'Opinio', 'Yumist', 'Zomato'],
	offReasons = ['FE Internet Issue', 'Merchant Internet Issue', 'Single pick multi drop', 'Other'],
	canReasons = ['Drop distance too far', 'Delivered Offline', 'Duplicate Order', 'No Order with merchant', 'Other'];

async.forEach(src, function(item, callback) {
	// console.log(item);
	app.models.Source.upsert({'name': item},
		callback);
}, function(err) {
	if(err) {
		throw err;
	} else {
		console.log('source added');
		addOffReasons();
	}
});

function addOffReasons() {
	console.log('inside reasons');
	async.forEach(offReasons, function(item, callback) {
	// console.log(item);
	app.models.Offreason.upsert({'reason': item},
		callback);
}, function(err) {
	if(err) {
		throw err;
	} else {
		console.log('offline reasons added');
		addCanReasons();
	}
});

}

function addCanReasons() {
	console.log('inside cancelled reasons');
	async.forEach(canReasons, function(item, callback) {
	// console.log(item);
	app.models.Canreason.upsert({'reason': item},
		callback);
}, function(err) {
	if(err) {
		throw err;
	} else {
		console.log('cancelled reasons added');
	}
});

}