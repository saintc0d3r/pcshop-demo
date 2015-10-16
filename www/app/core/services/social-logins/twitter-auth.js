angular.module('pcshop.core.services')
.provider('TwitterAuth', function(){
	this.AuthUrl = '';	  			 // e.g. http://pcshop.demo:3000/auth/facebook
	this.TokenStore = window.sessionStorage; // e.g. window.sessionStorage

	this.$get = ['SocialAuthBase', function(SocialAuthBase){
		TwitterAuth.prototype = new SocialAuthBase();
		TwitterAuth.prototype.constructor = TwitterAuth;
		function TwitterAuth(authUrl, tokenStore){
			this.AuthUrl = authUrl;
			this.TokenStore = tokenStore;
			this.TokenStoreKey = 'twitterToken';
		}

		return new TwitterAuth(this.AuthUrl, this.TokenStore);
	}];
});