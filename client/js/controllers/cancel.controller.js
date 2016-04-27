'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('CancelController', ['$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', 'Cancelled', 'Restaurant', 'Canreason', function($scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope, Cancelled, Restaurant, Canreason) {
	
    $scope.restaurant = null;
    $scope.order_code = null;
	$scope.source = null;
	$scope.fe_id = null;
	$scope.assigned_at = null;
	$scope.cancelled_at = null;
	$scope.cancelled_by = null;
	$scope.cancellation_reason = null;
	$scope.description = null;
	$scope.final_status = null;
	$scope.cancelledData = [];
	$scope.edit = false;

	$scope.time = function(obj) {
		var hm = obj.time.split(':'),
			hours = hm[0],
			mins = hm[1];
		var date = new Date(),
			zeroHour = date.setHours(0,0,0,0),
			dateInMili = zeroHour + hours*3600000 + mins*60000,
			parsedDate = new Date(dateInMili);
		if(obj.id == 1) {
			$scope.assigned_at = parsedDate;
		} else {
			$scope.cancelled_at = parsedDate;
			// console.log('changed time = ', $scope.cancelled_at);
		}
		// console.log('changed time = ', parsedDate);
	};


	$scope.submitCancelled = function() {
		Cancelled.create({
		  	"date": $rootScope._date,
		  	"restaurant": $scope.restaurant,
		    "order_code": $scope.order_code,
			"source": $scope.source,
			"fe_id": $scope.fe_id,
			"assigned_at": $scope.assigned_at,
			"cancelled_at": $scope.cancelled_at,
			"cancelled_by": $scope.cancelled_by,
			"cancellation_reason": $scope.cancellation_reason,
			"description": $scope.description,
			"final_status": $scope.final_status,
			"dcName": $rootScope._user.dc_name,
			"city": $rootScope._user.city
		}, function(successResp) {
			// console.log('create cancelled response = ', successResp);
			$scope.cancelledData.push(successResp);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Cancelled has been Successfully Submitted';
		    $scope.restaurant = null;
		    $scope.order_code = null;
			$scope.source = null;
			$scope.fe_id = null;
			$scope.assigned_at = null;
			$scope.cancelled_at = null;
			$scope.cancelled_by = null;
			$scope.cancellation_reason = null;
			$scope.description = null;
			$scope.final_status = null;
		}, function(error) {
			// console.log('create Cancelled error = ', error);
			$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
			if(error.status == 422) {
				$scope.alertMessage = 'All fields are Mandatory';
			}
		});
	}

	$scope.getCancelledHistory = function() {
		Cancelled.find({filter: {where: {dcName: $rootScope._user.dc_name, city: $rootScope._user.city}}}, function(successResponse) {
			if(successResponse) {
				// console.log(successResponse);
				$scope.cancelledHistory = successResponse;
			} else {
				//to be handeled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.getCancelledDatewise = function() {
		// console.log('fromDate = ', $scope.fromDate, 'toDate = ', $scope.toDate);
		Cancelled.find({filter: {where: {date: {between: [$scope.fromDate, $scope.toDate]}, dcName: $rootScope._user.dc_name, city: $rootScope._user.city}}}, function(successResponse) {
			if(successResponse) {
				// console.log(successResponse);
				$scope.cancelledHistory = successResponse;
			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.updateCancelled = function(record) {
		// console.log('record = ', record);
		Cancelled.updateAll({where: {id: record.id, dcName: $rootScope._user.dc_name, city: $rootScope._user.city}}, {
							  	"restaurant": $scope.restaurant,
							    "order_code": $scope.order_code,
								"source": $scope.source,
								"fe_id": $scope.fe_id,
								"assigned_at": $scope.assigned_at,
								"cancelled_at": $scope.cancelled_at,
								"cancellation_reason": $scope.cancellation_reason,
								"description": $scope.description,
								"final_status": $scope.final_status
												}, function(successResponse) {
			// console.log('update response = ', successResponse);
		}, function(error) {
			console.log(error);
		});
	}

	$scope.getRestaurantList = function() {
		Restaurant.find({filter: {where: {dcName: $rootScope._user.dc_name, city: $rootScope._user.city}}}, 
			function(successResponse) {
				// console.log('drop down data = ', successResponse);
				$scope.restaurants = successResponse;
			}, function(error) {
				console.log(error);
		});
	};

	// $scope.getCancelReasons = function() {
	// 	Canreason.find({}, function(successResponse) {
	// 		console.log('getCancelReasons = ', successResponse);
	// 		$rootScope._cancelReasons = successResponse;
	// 	}, function(error) {
	// 		console.log('getCancelReasons = ', error);
	// 	})
	// }
}]);