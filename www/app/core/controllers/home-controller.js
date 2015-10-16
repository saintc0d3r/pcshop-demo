angular.module('pcshop.core.controllers')
.controller('HomeController', function($scope, $ionicSideMenuDelegate, Modals, Auth){
	/**
	 * A helper for updating the visibility of Login & Logout Buttons.
	 */
	var updateLoginLogoutButtonsVisibility = function(){
		var is_authenticated = Auth.is_authenticated();	
		if (is_authenticated){
			$scope.showButtonLogout	= true;
			$scope.showButtonLoginSignup = false;
		}
		else{
			$scope.showButtonLogout	= false;
			$scope.showButtonLoginSignup = true;			
		}
	}

	updateLoginLogoutButtonsVisibility();

	$scope.$on('SocialLoginSuccess', function(authToken){
		console.log("[DEBUG] - $scope.$on('SocialLoginSuccess') is triggered.");
		updateLoginLogoutButtonsVisibility();
	});


	/**
	 * Reveal/hide left side navigation menu 
	 */
	$scope.slide_left_side_menu = function(){
		$ionicSideMenuDelegate.toggleLeft();
	}

	/**
	 * Show Login Signup Modal view.
	 */	
	$scope.show_login_signup_view = function(){
		// TODO: Implement this
		Modals.show_login_signup_modal($scope);
	}

	/**
	 * Logout from current session
	 */
	$scope.logout = function(){
		Auth.logout();
		updateLoginLogoutButtonsVisibility();
	}
});