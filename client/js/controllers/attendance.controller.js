'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('AttendanceController', ['$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', 'Attendance', function($scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope, Attendance) {
	$scope._date = new Date().setHours(0,0,0,0);
	$scope.headcount = null;
	$scope.present_m = null;
	$scope.present_e = null;
	$scope.absent = null;
	$scope.weekoff = null;
	$scope.feexpress_m = null;
	$scope.feexpress_e = null;
	$scope.parttimer1 = null;
	$scope.parttimer2 = null;
	$scope.parttimer3 = null;
	$scope.toDate = null;
	$scope.fromDate = null;
	$scope.edit = false;
	$scope.dc;

	$scope.submitAttendance = function() {
		Attendance.create({
		  "date": $scope._date,
		  "city": $rootScope._user.city,
		  "headcount": $scope.headcount,
		  "present_m": $scope.present_m,
		  "present_e": $scope.present_e,
		  "absent": $scope.absent,
		  "weekoff": $scope.weekoff,
		  "feexpress_m": $scope.feexpress_m,
		  "feexpress_e": $scope.feexpress_e,
		  "parttimer1": $scope.parttimer1,
		  "parttimer2": $scope.parttimer2,
		  "parttimer3": $scope.parttimer3,
		  "dcName": $rootScope._user.dc_name
		}, function(successResp) {
			// console.log('create attendance response = ', successResp);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Attendance has been Successfully Submitted';
			$scope.headcount = null;
			$scope.present_m = null;
			$scope.present_e = null;
			$scope.absent = null;
			$scope.weekoff = null;
			$scope.feexpress_m = null;
			$scope.feexpress_e = null;
			$scope.parttimer1 = null;
			$scope.parttimer2 = null;
			$scope.parttimer3 = null;
		}, function(error) {
			console.log('create Attendance error = ', error);
			$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
			if(error.status == 422) {
				$scope.alertMessage = 'All fields are Mandatory';
			}
		});
	}

	// $scope.getAttendanceHistory = function() {
	// 	Attendance.find({filter: {where: {dcName: $rootScope._user.dc_name}}}, function(successResponse) {
	// 		if(successResponse) {
	// 			console.log(successResponse);
	// 			$scope.attendanceHistory = successResponse;
	// 		} else {
	// 			//to be handeled
	// 		}
	// 	}, function(error) {
	// 		console.log(error);
	// 	});
	// }

	$scope.getAttendanceDatewise = function() {
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

	$scope.updateAttendance = function(record) {
		// console.log('record = ', record);
		Attendance.updateAll({where: {id: record.id, dcName: $scope.dc}}, {
												  "headcount": record.headcount,
												  "present_m": record.present_m,
												  "present_e": record.present_e,
												  "absent": record.absent,
												  "weekoff": record.weekoff,
												  "feexpress_m": record.feexpress_m,
												  "feexpress_e": record.feexpress_e,
												  "parttimer1": record.parttimer1,
												  "parttimer2": record.parttimer2,
												  "parttimer3": record.parttimer3
												}, function(successResponse) {
			// console.log('update response = ', successResponse);
		}, function(error) {
			console.log(error);
		});
	}
}]);