angular.module('pcshop.core.controllers')
.config(function(FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider){
	// FacebookAuthProvider.AuthUrl = "http://pcshop.demo:3000/auth/facebook";
	FacebookAuthProvider.AuthUrl = "http://dev1.xtremecodes.asia/auth/facebook";
	GoogleAuthProvider.AuthUrl = "http://dev1.xtremecodes.asia/auth/google";
	TwitterAuthProvider.AuthUrl = "http://dev1.xtremecodes.asia/auth/twitter";
})
.controller('LoginSignupController', function($rootScope, $scope, Modals , Auth ){
	/**
	 * A helper to handle login's result
	 */
	var handle_login_result = function(err, authToken){
		if (err == null){
			Modals.hide_login_signup_modal();
			$scope.$emit('SocialLoginSuccess', authToken);
		}
		else{
			alert('Error:'+err.error+' Description:'+err.error_description);
		}
	}

	/**
	 * Hide Login Signup Modal view.
	 */
	$scope.close_login_signup_view = function(){
		Modals.hide_login_signup_modal();
	}

	/**
	 * Handle an event when the user tap Login with Facebook button
	 */
	$scope.login_with_facebook = function(){
		Auth.login_with_facebook(function(err, fbToken){
			handle_login_result(err, fbToken);
		});		
	}

	/**
	 * Handle an event when the user tap Login with Google + button
	 */
	$scope.login_with_googleplus = function(){
		Auth.login_with_googleplus(function(err, gplusToken){
			handle_login_result(err, gplusToken);
		});
	}

	/**
	 * Handle an event when the user tap Login with Twitter button
	 */	
	$scope.login_with_twitter = function(){
		Auth.login_with_twitter(function(err, twitterToken){
			handle_login_result(err, twitterToken);
		});
	}

});