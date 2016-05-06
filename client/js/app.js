var app = angular.module('hyperLocalDelivery', ['lbServices', 'ui.router', 'angular-growl', 'jkuri.timepicker', 'ngCookies', 'underscore']);

app.run(['LoopBackAuth', 'Enduser', '$rootScope', '$http', '$state', '$window' , '$log' , '$location', 'Dropdownservice', 'Hubmapping', '$cookies', 'Restaurant', function(LoopBackAuth, Enduser, $rootScope, $http, $state, $window, $log, $location, Dropdownservice, Hubmapping, $cookies, Restaurant) {
    $rootScope._user = null;
    console.log('app.run = ', Enduser.isAuthenticated());

    console.log('path = ', $location.path());

    if(!Enduser.isAuthenticated()) {
      $state.go('home.login');
    } else {
        // console.log('in app.run condition');
        if($location.path() != '' && $location.path() != '/') {
            console.log('executing $location');
            $location.path($location.path());
        } else {
            $state.go('home.app.view');
        }
    }


  if(Enduser.isAuthenticated()) {
    Enduser.findById({'id': LoopBackAuth.currentUserId},
        function(successResp) {
            // console.log('successResp = ', successResp.role);
            if(successResp.role != 'operator') {
                Hubmapping.find({filter: {where: {'email': successResp.email}}}, function(s) {
                    // console.log('dcs = ', s);
                    successResp.dcArray = [];
                    s.map(function(item) {
                        // console.log(item);
                        if(successResp.dcArray.indexOf(item.dcName) == -1)
                            successResp.dcArray.push(item.dcName);
                    });
                    $rootScope._user = successResp;
                }, function(e) {
                    console.log(e);
                });
            } else {
                $rootScope._user = successResp;
                getRestaurants();
            }
        }, function(errorMessage) {
                console.log(errorMessage);
        });
  }

    function getRestaurants() {
        // console.log('_hub = ', $rootScope._hub);
        Restaurant.find({filter: {where: {dcName: $rootScope._user.dc_name}}}, function(data) {
            $rootScope._user.restaurants = data;
            // console.log('restaurant\'s length = ', data.length);
        }, function(error) {
        });
    }

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    // console.log(fromState, toState);
    // if(toState.name !== 'home.login') {
    //   $state.go("home.login");
    // }
    console.log('isAuthenticated = ', Enduser.isAuthenticated(), 'toState = ', toState.name); 

    if(toState.name != 'home.login') {
    	console.log('not login');
    	if(!Enduser.isAuthenticated()) {
    		console.log('to login');
    		$state.go('home.login');
    	} else {
            return;
        }
    } else {
    	console.log('to login');
        if(Enduser.isAuthenticated()) {
            $state.go(fromState);
        }
    }

  });
}])
.factory('_' , window._
	)
.filter('dateFilter', [
    '$filter', function($filter) {
        return function(input, format) {
            return $filter('date')(new Date(input), format);
        };
    }
]);;