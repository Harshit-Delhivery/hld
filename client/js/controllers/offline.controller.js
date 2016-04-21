'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('offlineController', ['$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', 'Offline', 'Offreason', function($scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope, Offline, Offreason) {
	$scope.date = null;
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

	$scope.submitOffline = function() {
		Offline.create({
		  "date": $scope.date,
		  "order_code": $scope.order_code,
		  "merchant_id": $scope.merchant_id,
		  "merchant_name": $scope.merchant_name,
		  "client": $scope.client,
		  "fe_name": $scope.fe_name,
		  "arrived_at": $scope.arrived_at,
		  "drop_started_at": $scope.drop_started_at,
		  "delivered_at": $scope.delivered_at,
		  "offline_reason": $scope.offline_reason,
		  "dcName": $rootScope._user.dc_name,
		  "city": $rootScope._user.city
		}, function(successResp) {
			console.log('create offline response = ', successResp);
			$scope.offlineData.push(successResp);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Offline Data has been Successfully Submitted';
			$scope.date = null;
			$scope.order_code = null;
			$scope.merchant_id =null;
			$scope.client = null;
			$scope.fe_name = null;
			$scope.arrived_at = null;
			$scope.drop_started_at = null;
			$scope.delivered_at = null;
			$scope.offline_reason = null;
		}, function(error) {
			console.log('create offline error = ', error);
			$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
			if(error.status == 422) {
				$scope.alertMessage = 'All fields are Mandatory';
			} else {
				$scope.alertMessage = error.data.error.message;
			}
		})
	}

	$scope.getOfflineHistory = function() {
		Offline.find({filter: {where: {dcName: $rootScope._user.dc_name, city: $rootScope._user.city}}}, function(successResponse) {
			if(successResponse) {
				console.log(successResponse);
				$scope.offlineHistory = successResponse;
			} else {
				//to be handeled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.getOfflineDatewise = function() {
		console.log('fromDate = ', $scope.fromDate, 'toDate = ', $scope.toDate);
		Offline.find({filter: {where: {date: {between: [$scope.fromDate, $scope.toDate]}, dcName: $rootScope._user.dc_name, city: $rootScope._user.city}}}, function(successResponse) {
			if(successResponse) {
				console.log(successResponse);
				$scope.offlineHistory = successResponse;
			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.updateOffline = function(record) {
		console.log('record = ', record);
		Offline.updateAll({where: {id: record.id, dcName: $rootScope._user.dc_name, city: $rootScope._user.city}},
			{	"merchant_id": record.merchant_id,
				"order_code": record.order_code,
				"merchant_name": record.merchant_name,
				"client": record.client,
				"fe_name": record.fe_name,
				"arrived_at":record.arrived_at,
				"drop_started_at": record.drop_started_at,
				"delivered_at": record.delivered_at,
				"offline_reason": record.offline_reason }, function(successResponse) {
			console.log('update response = ', successResponse);
		}, function(error) {
			console.log(error);
		});
	}

	// $scope.getOfflineReasons = function() {
	// 	Offreason.find({}, function(successResponse) {
	// 		console.log('getOfflineReasons = ', successResponse);
	// 		$rootScope._offlineReasons = successResponse;
	// 	}, function(error) {
	// 		console.log('getOfflineReasons = ', error);
	// 	})
	// }
}]);