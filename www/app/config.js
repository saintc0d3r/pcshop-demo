angular.module('pcshop.config', [])
	.provider('Configuration', function () {
	// Declare app's configuration settings in here
	this.UseFakeDatasource = true;
//	ItemsDatasourceProvider.RestEndpoint = "http://localhost:3000/api";
//	ItemsDatasourceProvider.RestEndpoint = "http://localhost:8080/api";		
	this.RestEndpoint = "http://dev1.xtremecodes.asia/api";	

	this.FacebookAuthUrl = "http://dev1.xtremecodes.asia/auth/facebook";
	this.GoogleAuthUrl = "http://dev1.xtremecodes.asia/auth/google";
	this.TwitterAuthUrl = "http://dev1.xtremecodes.asia/auth/twitter";

	var that = this;

	this.$get = {
		// Expose the configuration settings to outside as you desire
		UseFakeDatasource : that.UseFakeDatasource,
		RestEndpoint : that.RestEndpoint,
		FacebookAuthUrl: that.FacebookAuthUrl,
		GoogleAuthUrl: that.GoogleAuthUrl,
		TwitterAuthUrl: that.TwitterAuthUrl
	};
});