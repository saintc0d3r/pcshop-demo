requirejs.config({
	baseUrl: 'app/',
	paths: {
		// 3rd party libs
        'ngResource':'lib/angular-resource/angular-resource.min',

		// modules
		'core': 'core/core-module',
		'productitem': 'features/productitem/productitem-module',

		// services
		'core.services.ui.modals': 'core/services/ui/modals',
		'core.services.social-auth-base': 'core/services/social-logins/social-auth-base',
		'core.services.facebook-auth': 'core/services/social-logins/facebook-auth',
		'core.services.google-auth': 'core/services/social-logins/google-auth',
		'core.services.twitter-auth': 'core/services/social-logins/twitter-auth',		
		'core.services.auth': 'core/services/authentication',
		'features.productitem.services.items-datasource': 'features/productitem/services/items-datasource',

		// controllers
		'core.controllers.home': 'core/controllers/home-controller',
		'core.controllers.login_signup': 'core/controllers/login-signup-controller',
		'features.productitem.controllers.items': 'features/productitem/controllers/items-controller',

		// config
		'config': 'config',

		// main entry
		'app': 'app'
	},
	shim: {
		// Services
		'core.services.ui.modals': ['core'],
		'core.services.social-auth-base': ['core'],
		'core.services.facebook-auth': ['core', 'core.services.social-auth-base'],
		'core.services.google-auth': ['core', 'core.services.social-auth-base'],
		'core.services.twitter-auth': ['core', 'core.services.social-auth-base'],
		'core.services.auth': ['core', 'core.services.facebook-auth', 'core.services.google-auth', 'core.services.twitter-auth'],
		'features.productitem.services.items-datasource': ['productitem', 'ngResource'],

		// controllers
		'core.controllers.home': ['core', 'core.services.ui.modals'],
		'core.controllers.login_signup': ['core', 'core.services.ui.modals'],
		'features.productitem.controllers.items': ['productitem', 'features.productitem.services.items-datasource', 'config'],

		// main entry
		'app': //['cordova',
			[
			'core', 'productitem',	 // modules
				'core.services.ui.modals', 'core.services.social-auth-base', 'core.services.facebook-auth', 'core.services.google-auth', 'core.services.twitter-auth', 'core.services.auth', 'features.productitem.services.items-datasource',	// services
				'core.controllers.home', 'core.controllers.login_signup', 'features.productitem.controllers.items' // controllers
			]
	}
});

require(['app'], function(){
	angular.bootstrap(document.body, ['pcshop']);
});