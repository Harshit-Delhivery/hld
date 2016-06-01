'use strict';

var app = angular.module('hyperLocalDelivery');


app.controller('LoginController', ['$q', '$scope', '$state', '$http', 'Enduser', 'notifyService', '$stateParams', '$rootScope', '$cookies', 'Restaurant', function($q, $scope, $state, $http, Enduser,  notifyService, $stateParams, $rootScope, $cookies, Restaurant) {
	// console.log('login controller');
	$scope.emailId = null;
	$scope.role = null;
	$scope.hub = null;
	$scope.dcName = null;;
	$scope.city = null;
	$scope.password = null;
	$scope.loginEmail = null;
	$scope.loginPassword = null;
	$scope.username = null;

	$scope.login = function () {
		Enduser.login({"role": $scope.role, "email": $scope.loginEmail, "city": $scope.city, "password": $scope.loginPassword}, 
			function(successResponse) {
			if(successResponse.user) {
				// console.log('login response = ', successResponse);
				$rootScope._user = successResponse.user;
        		//console.log('$rootScope._user = ', $rootScope._user.role);				
		        $state.go('home.app.view');
				notifyService.successMessage('Successfully Logged In!!!!!!!!', 5000);
			}
		}, function(error) {
			console.log('error = ', error);
			notifyService.warnMessage(error.data.error.message, 5000);
		});
	}

	$scope.signUp = function() {
		// console.log('signUp = ', {"email": $scope.emailId, "city": $scope.city, "password": $scope.password, "role": $scope.role, "dc_name": $scope.dcName});

		Enduser.create({"email": $scope.emailId, "city": $scope.city, "password": $scope.password, "role": $scope.role, "dc_name": $scope.dcName, "username": $scope.username}, 
			function(successResponse) {
        	//console.log('success response = ', successResponse);
        	$state.go('home.login');
        	notifyService.infoMessage('Your Account Has Been Created......', 5000);
        }, function(error) {
        	console.log('error = ', error.data.error);
        	notifyService.warnMessage(error.data.error.message, 5000);
        });
    }

    $scope.logOut = function() {
    	var deffered = $q.deffer;
    	$cookies.remove('selectedHub');
    	Enduser.logout().$promise.then(function() {
			console.log('authentication = ', Enduser.isAuthenticated());
			$state.go('home.login');
			delete $rootScope._user;
    		notifyService.infoMessage('You Have Been Logged Out Successfully......', 5000);
    	});
    }
}]);