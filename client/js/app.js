var app = angular.module('hyperLocalDelivery', ['lbServices', 'ui.router', 'angular-growl', 'ui.bootstrap.datetimepicker']);

app.run(['LoopBackAuth', 'Enduser', '$rootScope', '$http', '$state', '$window' , '$log' , '$location', 'Dropdownservice', function(LoopBackAuth, Enduser, $rootScope, $http, $state, $window, $log, $location, Dropdownservice) {
    $rootScope._user = null;
    console.log('app.run');
    // if(!Enduser.isAuthenticated()) {
    //   $state.go('home.login');
    // } else {
    //     $state.go('home.app.view.home');
    // }


  if(Enduser.isAuthenticated()) {
    // console.log('LoopBackAuth = ', LoopBackAuth);
    Enduser.findById({'id': LoopBackAuth.currentUserId},
        function(successResp) {
            // console.log('successResp = ', successResp);
            $rootScope._user = successResp;
        }, function(errorMessage) {
            console.log(errorMessage);
    });
  }

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, notifyService) {
    // console.log(fromState, toState);
    // if(toState.name !== 'home.login') {
    //   $state.go("home.login");
    // }
    console.log('isAuthenticated = ', Enduser.isAuthenticated(), 'toState = ', toState.name);

    if(toState.name != 'home.login') {
    	console.log('1');
    	if(!Enduser.isAuthenticated()) {
    		console.log('to login');
    		$state.go('home.login');
    	} else {
    		return;
    	}
    } else {
    	console.log('2');
    	return;
    }
  });
}])
.factory('notifyService' , ['$rootScope', '$state' , 'growl', function ($rootScope, $state , growl) {
		var notifyService = this;
		notifyService.warnMessage = function(message , timeout, callback) {
	        growl.addWarnMessage(message ,  {ttl: timeout}, callback);
	    };
	    notifyService.infoMessage = function(message , timeout, callback) {
	        growl.addInfoMessage(message ,  {ttl: timeout}, callback);
	    };
	    notifyService.successMessage = function(message , timeout, callback) {
	        growl.addInfoMessage(message ,  {ttl: timeout}, callback);
	    };
	    notifyService.errorMessage = function(message , timeout, callback) {
	        growl.addInfoMessage(message ,  {ttl: timeout}, callback);
	    };
	    
	    return notifyService;
	}])
.filter('dateFilter', [
    '$filter', function($filter) {
        return function(input, format) {
            // var temp = input.split(':000Z'),
            // input = temp[0] + '-530Z';
            return $filter('date')(new Date(input), format);
        };
    }
]);;