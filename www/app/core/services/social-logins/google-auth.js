angular.module('pcshop.core.services')
.provider('GoogleAuth', function(){
	this.AuthUrl = '';	  			 // e.g. http://pcshop.demo:3000/auth/facebook
	this.TokenStore = window.sessionStorage; // e.g. window.sessionStorage

	this.$get = ['SocialAuthBase', function( SocialAuthBase){
		GoogleAuth.prototype = new SocialAuthBase();
		GoogleAuth.prototype.constructor = GoogleAuth;
		function GoogleAuth(authUrl, tokenStore, isRunningInCordova){
			this.AuthUrl = authUrl;
			this.TokenStore = tokenStore;
			this.TokenStoreKey = 'googleToken';
		}

		return new GoogleAuth(this.AuthUrl, this.TokenStore);
	}];
});