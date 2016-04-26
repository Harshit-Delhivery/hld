'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('LoginController', ['$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', function($scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope) {
	console.log('login controller');
	$scope.emailId = null;
	$scope.dcName = null;;
	$scope.city = null;
	$scope.password = null;
	$scope.loginEmail = null;
	$scope.loginPassword = null;

	$scope.login = function () {
		Enduser.login({"email": $scope.loginEmail, "city": $scope.city, "password": $scope.loginPassword}, 
			function(successResponse) {
			if(successResponse.user) {
				console.log('login response = ', successResponse);
				$rootScope._user = successResponse.user;
        		console.log('$rootScope._user = ', $rootScope._user);
				$state.go('home.app.view.home');
				notifyService.successMessage('Successfully Logged In!!!!!!!!', 5000);
			}
		}, function(error) {
			console.log('error = ', error);
			notifyService.warnMessage(error.data.error.message, 5000);
		})
	}

	$scope.signUp = function() {
		// console.log('signUp = ', $scope.emailId, $scope.dcName);
		Enduser.create({"email": $scope.emailId, "city": $scope.city, "password": $scope.password, "dc_name": $scope.dcName}, 
			function(successResponse) {
        	console.log('success response = ', successResponse);
        	$state.go('home.login');
        	notifyService.infoMessage('Your Account Has Been Created......', 5000);
        }, function(error) {
        	console.log('error = ', error.data.error);
        	notifyService.warnMessage(error.data.error.message, 5000);
        });
    }

    $scope.logOut = function() {
    	Enduser.logout();
    	console.log('authentication = ', Enduser.isAuthenticated());
    	$state.go('home.login');
    	notifyService.infoMessage('You Have Been Logged Out Successfully......', 5000);
    }
}]);