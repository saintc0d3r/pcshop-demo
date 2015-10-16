angular.module('pcshop.core.services')
	.config(function (FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, ConfigurationProvider) {
		FacebookAuthProvider.AuthUrl = ConfigurationProvider.FacebookAuthUrl;
		GoogleAuthProvider.AuthUrl = ConfigurationProvider.GoogleAuthUrl;
		TwitterAuthProvider.AuthUrl = ConfigurationProvider.TwitterAuthUrl;
	})
	.service('Auth', function($http, FacebookAuth, GoogleAuth, TwitterAuth) {

		/**
		 * Do login with Facebook account.
		 */
		this.login_with_facebook = function(callback){
			FacebookAuth.login().then(
				function(fbAuthInfo){
					callback(null, fbAuthInfo);
				}, 
				function(fbAuthError){
					callback(fbAuthError, null);
				}
			);
		};

		/**
		 * Do login with Google +
		 */
		this.login_with_googleplus = function (callback) {
			GoogleAuth.login().then(
				function(googleAuthInfo){
					callback(null, googleAuthInfo);
				}, 
				function(googleAuthError){
					callback(googleAuthError, null);
				}
			);
		};

		/**
		 * Do login with Twitter
		 */
		this.login_with_twitter = function (callback) {
			TwitterAuth.login().then(
				function(twitterAuthInfo){
					callback(null, twitterAuthInfo);
				}, 
				function(twitterAuthError){
					callback(twitterAuthError, null);
				}
			);
		};

		/**
		 * Check whether current user is logged in.
		 */
		this.is_authenticated = function(){
			console.log('[DEBUG] - Auth.is_authenticated is called.');
			var fb_is_authenticated = FacebookAuth.is_authenticated();
			console.log('[DEBUG] - FacebookAuth.is_authenticated = .'+ fb_is_authenticated);			

			var gplus_is_authenticated = GoogleAuth.is_authenticated();
			console.log('[DEBUG] - GoogleAuth.is_authenticated = .'+ gplus_is_authenticated);			

			var twitter_is_authenticated = TwitterAuth.is_authenticated();
			console.log('[DEBUG] - TwitterAuth.is_authenticated = .'+ twitter_is_authenticated);			

			var result = fb_is_authenticated | gplus_is_authenticated | twitter_is_authenticated;

			console.log("[DEBUG] - Auth.is_authenticated's result ="+result);
			return result;
		};

		/**
		 * Logout fb account
		 */
		this.logout = function(){
			FacebookAuth.logout();
			GoogleAuth.logout();
			TwitterAuth.logout();
		}
	});