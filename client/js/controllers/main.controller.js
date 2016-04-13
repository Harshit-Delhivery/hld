'use strict';

var app = angular.module('hyperLocalDelivery');

app.controller('hyperLocalDeliveryController', function($scope, $http, Enduser, $state) {

  console.log('inside hyperLocalDeliveryController');
  //$state.go('home');
  // $state.go('home.login');
 
//  	$scope.todos = User.find();
//  	$scope.todo;
//  	$scope.loading=false;

//   	$scope.add = function(){
//   		$scope.loading=true;
  		
//   		User.create({title: $scope.todo.title,isDone:false }).$promise
//  			 .then(function(todo) { 
//  			 		$scope.todos.push(todo);
//  			 		$scope.todo.title='';
//  			 		$scope.loading=false;
//  			  });;
//   	};

//   	$scope.delete = function($index){
  		
//   		$scope.loading=true;
//   		var todo = $scope.todos[$index];
  		
//   		Todo.deleteById({ id: todo.id}).$promise
//   		    .then(function() {
// 				$scope.todos.splice($index,1);
// 				$scope.loading=false;
// 		     });
//   	};

//   	$scope.update = function(todo){
//   		todo.$save();
//   	};
	
});