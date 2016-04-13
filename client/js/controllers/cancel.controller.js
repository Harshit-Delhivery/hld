'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('cancelController', ['$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', 'Cancelled', function($scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope, Cancelled) {
	$scope.date = null;
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


	$scope.submitCancelled = function() {
		Cancelled.create({
		  	"date": $scope.date,
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
			console.log('create cancelled response = ', successResp);
			$scope.cancelledData.push(successResp);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Cancelled has been Successfully Submitted';
			$scope.date = null;
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
			console.log('create Cancelled error = ', error);
			$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
			if(error.status == 422) {
				$scope.alertMessage = 'All fields are Mandatory';
			}
		});
	}

	$scope.getCancelledHistory = function() {
		Cancelled.find({filter: {where: {dcName: $rootScope._user.dc_name, city: $rootScope._user.city}}}, function(successResponse) {
			if(successResponse) {
				console.log(successResponse);
				$scope.cancelledHistory = successResponse;
			} else {
				//to be handeled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.getCancelledDatewise = function() {
		console.log('fromDate = ', $scope.fromDate, 'toDate = ', $scope.toDate);
		Cancelled.find({filter: {where: {date: {between: [$scope.fromDate, $scope.toDate]}, dcName: $rootScope._user.dc_name, city: $rootScope._user.city}}}, function(successResponse) {
			if(successResponse) {
				console.log(successResponse);
				$scope.cancelledHistory = successResponse;
			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.updateCancelled = function(record) {
		console.log('record = ', record);
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
			console.log('update response = ', successResponse);
		}, function(error) {
			console.log(error);
		});
	}
}]);