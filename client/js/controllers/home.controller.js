'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('HomeController', ['$scope', '$state', '$http', 'notifyService', '$stateParams', '$rootScope', 'Restaurant', function($scope, $state, $http, notifyService, $stateParams, $rootScope, Restaurant) {
	$scope.restaurant = null;
	$scope.addRestaurant = function() {
		Restaurant.create({
			'merchantName': $scope.restaurant, 
			'merchantId': 0, 
			"dcName": $rootScope._user.dc_name,
			"city": $rootScope._user.city },
			function(successResponse) {
				$scope.restaurant = null;
				console.log('home controller successResponse = ', successResponse);
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
}]);
