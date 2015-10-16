angular.module('pcshop.core.services',['ionic']);
angular.module('pcshop.core.controllers',['ionic']);

angular.module('pcshop.core', ['pcshop.core.services','pcshop.core.controllers'])
.config(function($stateProvider){
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'app/core/views/home.html',
			controller: 'HomeController'
		});
});