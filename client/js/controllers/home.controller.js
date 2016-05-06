'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('HomeController', ['$scope', '$state', '$q', '$http', 'notifyService', '$stateParams', '$rootScope', 'Restaurant', 'Orders', 'Attendance', '_', function($scope, $state, $q, $http, notifyService, $stateParams, $rootScope, Restaurant, Orders, Attendance, _) {
	$scope.getOrderDatewise = function() {
		// console.log('fromDate = ', $scope.fromDate, 'toDate = ', $scope.toDate);
		var query = {'and': []};
		if($rootScope._user.role == 'clm') {
			query.and.push({'date': {between: [$scope.fromDate, $scope.toDate]}});
			query.and.push({'dcName': $scope.dc});
		} else {
			query.and.push({'date': $scope.selectedDate});
			query.and.push({'dcName': $scope.dc});
			// {date: {between: [$scope.fromDate, $scope.toDate]}, hub: $rootScope._user.dc_name, dcName: $scope.dcName}
		}
		console.log('1 = ', query);
		Orders.find({filter: {where: query}}, function(successResponse) {
			if(successResponse) {
				console.log(successResponse);
				$scope.orderHistory = successResponse;
			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.getAttendanceDatewise = function() {
		// console.log('fromDate = ', $scope.fromDate, 'toDate = ', $scope.toDate);
		var query = {'and': []};
		if($rootScope._user.role == 'clm') {
			query.and.push({'date': {between: [$scope.fromDate, $scope.toDate]}});
			query.and.push({'dcName': $scope.dc});
		} else {
			query.and.push({'date': $scope.selectedDate});
			query.and.push({'dcName': $scope.dc});
			// {date: {between: [$scope.fromDate, $scope.toDate]}, hub: $rootScope._user.dc_name, dcName: $scope.dcName}
		}
		console.log(query);
		Attendance.find({filter: {where: query}}, function(successResponse) {
			if(successResponse) {
				console.log(successResponse);
				$scope.attendanceHistory = successResponse;
			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.getProductivityDatewise = function() {
		
		
		function getAttendance() {
			var deferred = $q.defer()
			try {
			 	$scope.getAttendanceDatewise();
			 	deferred.resolve();
			 } catch(e) {
			 	deferred.reject(e);
			 }
			return deferred.promise;
		}

		getAttendance().then(function() {
			console.log('then = ', $scope.attendanceHistory);
		});
	}

	// function productivity() {
	// 	console.log('productivity = ', $scope.)
	// }



	var arr = [1,2,3,4,5,6,7,8,9];
	console.log('max = ', _.max(arr));
}]);
