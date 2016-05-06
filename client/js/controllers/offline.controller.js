'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('OfflineController', ['$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', 'Offline', 'Offreason', 'Restaurant', function($scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope, Offline, Offreason, Restaurant) {
	$scope._date = new Date().setHours(0,0,0,0);
	$scope.order_code = null;
	$scope.merchant_id =null;
	$scope.merchant_name =null;
	$scope.client = null;
	$scope.fe_name = null;
	$scope.arrived_at = null;
	$scope.drop_started_at = null;
	$scope.delivered_at = null;
	$scope.offline_reason = null;
	$scope.offlineData = [];
	$scope.edit = false;
	$scope.dc;

	$scope.time = function(obj) {
		var hm = obj.time.split(':'),
			hours = hm[0],
			mins = hm[1];
		var date = new Date(),
			zeroHour = date.setHours(0,0,0,0),
			dateInMili = zeroHour + hours*3600000 + mins*60000,
			parsedDate = new Date(dateInMili);
		if(obj.id == 1) {
			$scope.arrived_at = parsedDate;
		} else if(obj.id == 2) {
			$scope.drop_started_at = parsedDate;
		} else {
			$scope.delivered_at = parsedDate;
		}
		// console.log('changed time = ', parsedDate);
	};

	$scope.submitOffline = function() {
		Offline.create({
		  "date": $scope._date,
		  "city": $rootScope._user.city,
		  "order_code": $scope.order_code,
		  "merchant_id": $scope.merchant_id,
		  "merchant_name": $scope.merchant_name,
		  "client": $scope.client,
		  "fe_name": $scope.fe_name,
		  "arrived_at": $scope.arrived_at,
		  "drop_started_at": $scope.drop_started_at,
		  "delivered_at": $scope.delivered_at,
		  "offline_reason": $scope.offline_reason,
		  "dcName": $rootScope._user.dc_name
		}, function(successResp) {
			// console.log('create offline response = ', successResp);
			$scope.offlineData.push(successResp);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Offline Data has been Successfully Submitted';
			$scope.order_code = null;
			$scope.merchant_id =null;
			$scope.merchant_name =null;
			$scope.client = null;
			$scope.fe_name = null;
			$scope.arrived_at = null;
			$scope.drop_started_at = null;
			$scope.delivered_at = null;
			$scope.offline_reason = null;
		}, function(error) {
			// console.log('create offline error = ', error);
			$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
			if(error.status == 422) {
				$scope.alertMessage = 'All fields are Mandatory';
			} else {
				$scope.alertMessage = error.data.error.message;
			}
		})
	}

	// $scope.getOfflineHistory = function() {
	// 	Offline.find({filter: {where: {hub: $rootScope._hub}}}, function(successResponse) {
	// 		if(successResponse) {
	// 			console.log(successResponse);
	// 			$scope.offlineHistory = successResponse;
	// 		} else {
	// 			//to be handeled
	// 		}
	// 	}, function(error) {
	// 		console.log(error);
	// 	});
	// }

	$scope.getOfflineDatewise = function() {
		// console.log('fromDate = ', $scope.fromDate, 'toDate = ', $scope.toDate);
		var query = {'and': []};
		if($rootScope._user.role == 'operator') {
			query.and.push({'date': {between: [$scope.fromDate, $scope.toDate]}});
			query.and.push({'dcName': $rootScope._user.dc_name});
		} else {
			query.and.push({'date': $scope.selectedDate});
			query.and.push({'dcName': $scope.dc});
			// {date: {between: [$scope.fromDate, $scope.toDate]}, hub: $rootScope._user.dc_name, dcName: $scope.dcName}
		}
		console.log(query);
		Offline.find({filter: {where: query}}, function(successResponse) {
			if(successResponse) {
				// console.log(successResponse);
				$scope.offlineHistory = successResponse;
			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.updateOffline = function(record) {
		// console.log('record = ', record);
		Offline.updateAll({where: {id: record.id, dcName: $rootScope._user.dc_name}},
			{	"merchant_id": record.merchant_id,
				"order_code": record.order_code,
				"merchant_name": record.merchant_name,
				"client": record.client,
				"fe_name": record.fe_name,
				"arrived_at":record.arrived_at,
				"drop_started_at": record.drop_started_at,
				"delivered_at": record.delivered_at,
				"offline_reason": record.offline_reason }, function(successResponse) {
			// console.log('update response = ', successResponse);
		}, function(error) {
			console.log(error);
		});
	}

	$scope.restaurant = null;
	$scope.addRestaurant = function() {
		Restaurant.create({
			'merchantName': $scope.restaurant,
			'merchantId': 0, 
			"dcName": $rootScope._user.dc_name,
			"city": $rootScope._user.city },
			function(successResponse) {
				$rootScope._user.restaurants.push({merchantName: $scope.restaurant});
				$scope.restaurant = null;
				// console.log('home controller successResponse = ', successResponse);
				$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
				$scope.alertMessage = 'Restaurant has been Added Successfully';
			}, function(error) {
				console.log(error);
				$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
				if(error.status == 422) {
					$scope.alertMessage = 'Please fill in the Restaurant Name';
				}
			});
	};

	// $scope.getRestaurantList = function() {
	// 	Restaurant.find({filter: {where: {hub: $rootScope._hub}}}, 
	// 	function(data) {
	// 		$rootScope._restaurants = data;
	// 		// console.log(data.length);
	// 	}, function(error) {
	// 	});
	// }
}]);