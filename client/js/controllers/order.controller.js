'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('OrderController', ['$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', 'Orders', function($scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope, Orders) {
	var nowDate = new Date() - 7200000,
		lagSeconds = new Date(nowDate).setHours(0,0,0,0);
	$scope._date = new Date(lagSeconds);
	$scope.online_m = null;
	$scope.online_e = null;
	$scope.offline_m = null;
	$scope.offline_e = null;
	$scope.cancel_m = null;
	$scope.cancel_e = null;
	$scope.express_m = null;
	$scope.express_e = null;

	$scope.submitOrder = function() {
		Orders.create(
		{
		  "date": $scope._date,
		  "city": $rootScope._user.city,
		  "online_m": $scope.online_m,
		  "offline_m": $scope.offline_m,
		  "cancel_m": $scope.cancel_m,
		  "express_m": $scope.express_m,
		  "dcName": $rootScope._user.dc_name
		}, function(successResp) {
			// console.log('create order response = ', successResp);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Order Data has been Successfully Submitted';
			$scope.online_m = null;
			$scope.offline_m = null;
			$scope.cancel_m = null;
			$scope.express_m = null;
			$scope.morningOrder = true;
			$scope.eveningOrder = false;
		}, function(error) {
			// console.log('create Order error = ', error);
			$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
			if(error.status == 422) {
				$scope.alertMessage = 'All fields are Mandatory';
			}
		});
	}

	$scope.isFilled = function() {
		Orders.find({filter: {where: {dcName: $rootScope._user.dc_name, date: $scope._date}}}, function(successResponse) {
			if(successResponse.length > 0) {
				// console.log('successResponse = ', successResponse);
				if(successResponse[0].online_e == null && successResponse[0].offline_e == null) {
					$scope.morningOrder = true;
					$scope.eveningOrder = false;
				} else {
					$scope.morningOrder = true;
					$scope.eveningOrder = true;
				}
			} else {
				$scope.morningOrder = false;
					$scope.eveningOrder = true;
			}
		}, function(error) {
			console.log(error);
		});
	}

	// console.log('isFilled = ', $scope.isFilled);

	$scope.getOrderDatewise = function() {
		// console.log('fromDate = ', $scope.fromDate, 'toDate = ', $scope.toDate);
		var query = {'and': []};
		if($rootScope._user.role == 'operator') {
			query.and.push({'date': {between: [$scope.fromDate, $scope.toDate]}});
			query.and.push({'dcName': $rootScope._user.dc_name});
		} else {
			query.and.push({'date': $scope.selectedDate});
			query.and.push({'dcName': $scope.dc});
		}
		// console.log(query);
		Orders.find({filter: {where: query}}, function(successResponse) {
			if(successResponse) {
				// console.log(successResponse);
				$scope.orderHistory = successResponse;
			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.updateOrder = function(record) {
		// console.log('record = ', $scope.dc);
		Orders.updateAll({where: {id: record.id, dcName: $scope.dc}},
			{
				"online_m": record.online_m,
				"online_e": record.online_e,
				"offline_m": record.offline_m,
				"offline_e": record.offline_e,
				"cancel_m": record.cancel_m,
				"cancel_e": record.cancel_e,
				"express_m": record.express_m,
				"express_e": record.express_e }, function(successResponse) {
			// console.log('update response = ', successResponse);
		}, function(error) {
			console.log(error);
		});
	}
	
	$scope.addEveningOrders = function() {
		Orders.updateAll({where: {date: $scope._date, dcName: $rootScope._user.dc_name}}, 
		{
		  "online_e": $scope.online_e,
		  "offline_e": $scope.offline_e,
		  "cancel_e": $scope.cancel_e,
		  "express_e": $scope.express_e
		}, function(successResponse) {
			// console.log('update response = ', successResponse);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Order Data has been Successfully Submitted';
			$scope.online_e = null;
			$scope.offline_e = null;
			$scope.cancel_e = null;
			$scope.express_e = null;
			$scope.eveningOrder = true;
		}, function(error) {
			console.log(error);
		});
	};
}]);
