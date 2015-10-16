angular.module('pcshop.core.services')
.provider('FacebookAuth', function(){
		this.AuthUrl = '';	  			 		 // e.g. http://pcshop.demo:3000/auth/facebook
	this.TokenStore = window.sessionStorage; // e.g. window.sessionStorage

	this.$get = ['SocialAuthBase', function( SocialAuthBase){
		FacebookAuth.prototype = new SocialAuthBase();
		FacebookAuth.prototype.constructor = FacebookAuth;
		function FacebookAuth(authUrl, tokenStore){
			this.AuthUrl = authUrl;
			this.TokenStore = tokenStore;
			this.TokenStoreKey = 'fbToken';
		}
		return new FacebookAuth(this.AuthUrl, this.TokenStore);
	}];
});