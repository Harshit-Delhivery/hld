'use strict';

angular.module('hyperLocalDelivery').controller('SidebarController', ['$scope', function($scope) {
	$scope.highlightSidebar = function(id) {
		$scope.id = id;
	}
}]);