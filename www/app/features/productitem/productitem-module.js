angular.module('pcshop.features.productitem.services',['ionic', 'ngResource']);
angular.module('pcshop.features.productitem.controllers', ['ionic', 'pcshop.features.productitem.services'])

angular.module('pcshop.features.productitem', ['pcshop.features.productitem.services', 'pcshop.features.productitem.controllers'])
.config(function($stateProvider, $urlRouterProvider){//, ItemsDataSourceProvider){
	$stateProvider
		.state('app.itemsfeed', {
			url: '/itemsfeed',
			views: {
				'homeContent': {
					templateUrl: 'app/features/productitem/views/items-feed.html',
					controller: 'ItemsController'
				}
			}
		});

	$urlRouterProvider.otherwise('/app/itemsfeed');
});