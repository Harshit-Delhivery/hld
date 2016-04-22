'use strict';

var app = angular.module('hyperLocalDelivery').service('Dropdownservice', ['$rootScope', '$state', 'Restaurant', 'Canreason', 'Offreason', 'Source', function($rootScope, $state, Restaurant, Canreason, Offreason, Source) {
	
	// Restaurant: Restaurant.find({}, function(data) {
	// 	$rootScope._restaurants = data;
	// 	// console.log(data);
	// }, function(error) {
	// });

	Canreason: Canreason.find({}, function(data) {
		$rootScope._cancelReasons = data;
	}, function(error) {
	});

	Offreason: Offreason.find({}, function(data) {
		$rootScope._offlineReasons = data;
	}, function(error) {
	});

	Source: Source.find({}, function(data) {
		$rootScope._source = data;
	}, function(error) {
	});
}]);