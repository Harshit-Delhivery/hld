var app = angular.module('hyperLocalDelivery', ['lbServices', 'ui.router', 'angular-growl', 'jkuri.timepicker', 'ngCookies']);

app.run(['LoopBackAuth', 'Enduser', '$rootScope', '$http', '$state', '$window' , '$log' , '$location', 'Dropdownservice', 'Hubmapping', '$cookies', 'Restaurant', function(LoopBackAuth, Enduser, $rootScope, $http, $state, $window, $log, $location, Dropdownservice, Hubmapping, $cookies, Restaurant) {
    $rootScope._user = null;
    // $rootScope._date = new Date();
    console.log('app.run');

    // if(!Enduser.isAuthenticated()) {
    //   $state.go('home.login');
    // }


  if(Enduser.isAuthenticated()) {
    Enduser.findById({'id': LoopBackAuth.currentUserId},
        function(successResp) {
            console.log('successResp = ', successResp.role);
            var where = {};
            if(successResp.role == 'operator') {
                where['dcEmail'] = successResp.email;
                $rootScope._hub = $cookies.get("selectedHub");
                getRestaurants();
            } else if(successResp.role == 'clm') {
                where['clmEmail'] = successResp.email;
            }
            Hubmapping.find({filter: {where: where}}, function(s) {
            console.log(s);
            successResp['hub'] = [];
            successResp['dcName'] = [];
            s.map(function(item) {
                console.log(item);
                successResp.hub.push(item.hub);
                if(successResp.dcName.indexOf(item.dcName) == -1)
                successResp.dcName.push(item.dcName);
            });
                $rootScope._user = successResp;
            }, function(e) {
                console.log(e);
            });
        }, function(errorMessage) {
                console.log(errorMessage);
        });
  }

    function getRestaurants() {
        console.log('_hub = ', $rootScope._hub);
        Restaurant.find({filter: {where: {hub: $rootScope._hub}}}, function(data) {
            $rootScope._restaurants = data;
            // console.log(data.length);
        }, function(error) {
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