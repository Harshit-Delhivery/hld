'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('AttendanceController', ['$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', 'Attendance', function($scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope, Attendance) {
	var nowDate = new Date() - 7200000,
		lagSeconds = new Date(nowDate).setHours(0,0,0,0);
		$scope._date = new Date(lagSeconds);
	// console.log($scope._date);
	$scope.headcount_m = null;
	$scope.headcount_e = null;
	$scope.present_m = null;
	$scope.present_e = null;
	$scope.absent_m = null;
	$scope.absent_e = null;
	$scope.weekoff_m = null;
	$scope.weekoff_e = null;
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
		  "headcount_m": $scope.headcount_m,
		  "present_m": $scope.present_m,
		  "absent_m": $scope.absent_m,
		  "weekoff_m": $scope.weekoff_m,
		  "feexpress_m": $scope.feexpress_m,
		  "parttimer2": $scope.parttimer2,
		  "dcName": $rootScope._user.dc_name
		}, function(successResp) {
			// console.log('create attendance response = ', successResp);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Attendance has been Successfully Submitted';
			$scope.headcount_m = null;
			$scope.present_m = null;
			$scope.absent_m = null;
			$scope.weekoff_m = null;
			$scope.feexpress_m = null;
			$scope.parttimer2 = null;
			$scope.morningAttendance = true;
			$scope.eveningAttendance = false;
		}, function(error) {
			$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
			$scope.alertMessage = 'There was an error in Submiting Attendance, Please try again or contact Admin';
		});
	}

	$scope.isFilled = function() {
		Attendance.find({filter: {where: {dcName: $rootScope._user.dc_name, date: $scope._date}}}, function(successResponse) {
			if(successResponse.length > 0) {
				// console.log('successResponse = ', successResponse[0].headcount_e);
				if(successResponse[0].present_e == null && successResponse[0].absent_e == null) {
					$scope.morningAttendance = true;
					$scope.eveningAttendance = false;
				} else {
					$scope.morningAttendance = true;
					$scope.eveningAttendance = true;
				}
			} else {
				$scope.morningAttendance = false;
				$scope.eveningAttendance = true;
			}
		}, function(error) {
			// console.log(error);
			$scope.alertClass = 'alert alert-danger alert-dismissible fade-in';
			$scope.alertMessage = 'There is an error, Please reload or open in \'INCOGNITO WINDOW\'';
		});
	}

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
		// console.log('record = ', record.id, $scope.dc);
		Attendance.updateAll({where: {id: record.id, dcName: $scope.dc}}, 
		{
		  "headcount_m": record.headcount_m,
		  "headcount_e": record.headcount_e,
		  "present_m": record.present_m,
		  "present_e": record.present_e,
		  "absent_m": record.absent_m,
		  "absent_e": record.absent_e,
		  "weekoff_m": record.weekoff_m,
		  "weekoff_e": record.weekoff_e,
		  "feexpress_m": record.feexpress_m,
		  "feexpress_e": record.feexpress_e,
		  "parttimer1": record.parttimer1,
		  "parttimer2": record.parttimer2,
		  "parttimer3": record.parttimer3
		}, function(successResponse) {
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Attendance has been Successfully Updated';
		}, function(error) {
			console.log(error);
		});
	}

	$scope.addEveningAttendance = function() {
		Attendance.updateAll({where: {date: $scope._date, dcName: $scope.dc}}, 
		{
		  "headcount_e": $scope.headcount_e,
		  "present_e": $scope.present_e,
		  "absent_e": $scope.absent_e,
		  "weekoff_e": $scope.weekoff_e,
		  "feexpress_e": $scope.feexpress_e,
		  "parttimer1": $scope.parttimer1,
		  "parttimer3": $scope.parttimer3
		}, function(successResponse) {
			console.log('update response = ', successResponse);
			$scope.alertClass = 'alert alert-success alert-dismissible fade-in';
			$scope.alertMessage = 'Attendance has been Successfully Submitted';
			$scope.headcount_e = null;
			$scope.present_e = null;
			$scope.absent_e = null;
			$scope.weekoff_e = null;
			$scope.feexpress_e = null;
			$scope.parttimer1 = null;
			$scope.parttimer3 = null;
			$scope.eveningAttendance = true;
		}, function(error) {
			console.log(error);
		});
	};
}]);