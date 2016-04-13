'use strict';

var app = angular.module('hyperLocalDelivery');

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    views: {
      'app-view': {
        templateUrl: '/views/app-view.html'
      }
    }
  })
  .state('home.login' , {
    url:'login/',
    views: {
      'home-view': {
        templateUrl: '/views/login.html',
        controller: 'loginController'
      }
    }
  })
  .state('home.signUp' , {
    url:'signUp/',
    views: {
      'home-view': {
        templateUrl: '/views/sign-up.html',
        controller: 'loginController'
      }
    }
  })
  .state('home.app', {
    url: 'app/',
    views: {
      'home-view': {
        templateUrl: '/views/landing.html'
      }
    }
  })
  .state('home.app.view' , {
    url: 'landing/',
    views: {
      'top-nav': {
        templateUrl: '/views/topNav.html',
        controller: 'loginController'
      },
      'side-nav': {
        templateUrl: '/views/sideNav.html'
      },
      'content-view': {
        templateUrl: '/views/contentView.html'
      }
    }
  })
  .state('home.app.view.home', {
    url: 'home',
    views: {
      'inner-view': {
        templateUrl: '/views/home.html'
      }
    }
  })
  .state('home.app.view.attendanceForm', {
    url: 'attendanceForm',
    views: {
      'inner-view': {
        templateUrl: '/views/attendance-form.html',
        controller: 'attendanceController'
      }
    }
  })
  .state('home.app.view.attendanceHistory', {
    url: 'attendanceHistory',
    views: {
      'inner-view': {
        templateUrl: '/views/attendance-history.html',
        controller: 'attendanceController'
      }
    }
  })
  .state('home.app.view.orderSummaryForm', {
    url: 'orderSummaryForm',
    views: {
      'inner-view': {
        templateUrl: '/views/orderSummary-form.html',
        controller: 'orderController'
      }
    }
  })
  .state('home.app.view.orderSummaryHistory', {
    url: 'orderSummaryHistory',
    views: {
      'inner-view': {
        templateUrl: '/views/orderSummary-history.html',
        controller: 'orderController'
      }
    }
  })
  .state('home.app.view.offlineEntry', {
    url: 'offlineEntry',
    views: {
      'inner-view': {
        templateUrl: '/views/offline-form.html',
        controller: 'offlineController'
      }
    }
  })
  .state('home.app.view.offlineHistory',  {
    url: 'offlineHistory',
    views: {
      'inner-view': {
        templateUrl: '/views/offline-history.html',
        controller: 'offlineController'
      }
    }
  })
  .state('home.app.view.cancelledForm', {
    url: 'cancelledForm',
    views: {
      'inner-view': {
        templateUrl: '/views/cancelled-form.html',
        controller: 'cancelController'
      }
    }
  })
  .state('home.app.view.cancelledHistory', {
    url: 'cancelledHistory',
    views: {
      'inner-view': {
        templateUrl: '/views/cancelled-history.html',
        controller: 'cancelController'
      }
    }
  })
}]);