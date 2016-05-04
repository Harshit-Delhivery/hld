var app = require('../server/server.js'),
	fs = require('fs'),
	csv = require('csv'),
	async = require('async'),
	extractData = [];

var obj = csv();

function toJsonObj(city, dcName, username, email, password, role) {
	this.city = city;
	this.dcName = dcName;
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
// City,Hub,DC,DC_email_ID,CLM name,CLM_email_ID,DC_Password,CLM_Password

		// console.log('dcName = ', item[2]);

		if(from.indexOf(item[3]) == -1) {
			extractData.push(new toJsonObj(item[0], item[2], null, item[3], item[6], 'operator'));
			if(from.indexOf(item[5]) == -1) {
				extractData.push(new toJsonObj(item[0], null, item[4], item[5], item[7], 'clm'));
				callback();
			} else {
				callback();
			}
		} else {
			callback();
		}
	}, function(err) {
		if(err) {
			throw err;
		} else {
			console.log('creating ', extractData.length, ' users', '\n please Wait..........');
			insertMapping();
		}
	});
});

function insertMapping() {
	// console.log('inside insertMapping = ', extractData.length);
	async.forEach(extractData, function(item, callback) {
		app.models.Enduser.create({
			'city': item.city,
			'dc_name': item.dcName,
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
