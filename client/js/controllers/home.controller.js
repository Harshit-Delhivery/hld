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
		// console.log('1 = ', query);
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
		// console.log(query);
		Attendance.find({filter: {where: query}}, function(successResponse) {
			if(successResponse) {
				// console.log(successResponse);
				$scope.attendanceHistory = successResponse;
			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}

	$scope.getProductivityDatewise = function() {

		var query = {'and': []};
		if($rootScope._user.role == 'clm') {
			query.and.push({'date': {between: [$scope.fromDate, $scope.toDate]}});
			query.and.push({'dcName': $scope.dc});
		} else {
			query.and.push({'date': $scope.selectedDate});
			query.and.push({'dcName': $scope.dc});
			// {date: {between: [$scope.fromDate, $scope.toDate]}, hub: $rootScope._user.dc_name, dcName: $scope.dcName}
		}
		// console.log('3 = ', query);
		Orders.find({filter: {where: query}}, function(orders) {
			if(orders) {
				// console.log(orders);

				Attendance.find({filter: {where: query}}, function(attendance) {
					if(attendance) {
						// console.log(attendance);
						$scope.productivity = [];
						attendance.map(function(atten) {
							var order = _.find(orders, function(item) { return item.date == atten.date;});
							var hlMorning = (order.online_m+order.offline_m)/(atten.present_m+atten.parttimer1+atten.parttimer2),
								hlEvening = (order.online_e+order.offline_e)/(atten.present_e+atten.parttimer3),
								hlOverall = (order.online_m+order.online_e+order.offline_e+order.offline_m)/(atten.present_m+atten.parttimer1+atten.parttimer2+atten.present_e+atten.parttimer3),
								express = (order.express_m+order.express_e)/(atten.feexpress_m+atten.feexpress_e),
								overall = (order.online_m+order.online_e+order.offline_e+order.offline_m+order.express_m+order.express_e)/(atten.present_m+atten.parttimer1+atten.parttimer2+atten.present_e+atten.parttimer3+atten.feexpress_m+atten.feexpress_e);
							// console.log('hlmorning= ', hlMorning.toFixed(2));
							$scope.productivity.push({date: atten.date, hlMorning: hlMorning.toFixed(2), hlEvening: hlEvening.toFixed(2), hlOverall: hlOverall.toFixed(2), express: express.toFixed(2), overall: overall.toFixed(2)});
						});
					} else {
						//to be handled
					}
				}, function(error) {
					console.log(error);
				});

			} else {
				//to be handled
			}
		}, function(error) {
			console.log(error);
		});
	}
}]);
