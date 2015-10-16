angular.module('pcshop.core.services')
.factory('SocialAuthBase', function($q){
	var SocialAuthBase = function(){
		this.AuthUrl= '';
		this.TokenStore= window.sessionStorage;
		this.TokenStoreKey= '',
		runningInCordova = window.cordova ? true : false,
		that = this,

		/**
		 * A helper to get auth token from url
		 */
		getAuthToken = function(url){
			var urlParamsPath = url.replace(/(http:\/\/){1,1}(.)+(\/auth\/success\/){1,1}/,'');
			var	urlParams = urlParamsPath.split('/');
			var displayName = urlParams.length > 0 ? urlParams[0] : '';
			var authToken = urlParams.length > 1 ? urlParams[1] : '';
			return {
				display_name: displayName,
				token: authToken
			}
		},

		/**
		 * A helper to determine whether current authentication is success or not.
		 */
		isAuthSuccess = function(url){
			return url.search(/^(http:\/\/){1,1}(.)+(\/auth\/success\/){1,1}(.)+(\/){1,1}(.)+/) != -1;
		};

		/**
		 * Logout from application
		*/
		this.logout = function(){
			this.TokenStore[this.TokenStoreKey] = null;
			// TODO: Send logout request to server		
		}		

		/**
		 * Determine if googleToken exists or not
		 */
		this.is_authenticated = function(){
			return typeof(this.TokenStore[this.TokenStoreKey]) == 'undefined' || this.TokenStore[this.TokenStoreKey] == 'null' ? false : true;
		}		

		// 	/**
		// 	 * Login on facebook account
		// 	 */
		this.login = function(){
			var loginProcessed = false, 
			    deferredLogin = $q.defer();

			if ( (this.AuthUrl === undefined ) || (this.AuthUrl === "")){
				deferredLogin.reject({error: 'Social auth url is not set.'});
				return deferredLogin.promise;
			}
			this.TokenStore[this.TokenStoreKey] = undefined;

	//				var loginWindow = window.open(this.AuthUrl,'_self','location=no,toolbar=no');
		    var loginWindow = window.open(this.AuthUrl,'_blank','location=no');
	//				var loginWindow = window.open(this.AuthUrl,'_blank','location=no,clearcache=true,toolbar=no,hidden=yes');				
	//				var loginWindow = window.open(this.AuthUrl,'_system','location=yes');				

			if ( runningInCordova ){
				loginWindow.addEventListener('loadstart', function(event) {
					console.log("[DEBUG] - loginWindow triggers loadstart event. Url:"+event.url);
					if (isAuthSuccess(event.url)){
						that.TokenStore[that.TokenStoreKey] = getAuthToken(event.url);
						loginProcessed = true;
						loginWindow.close();
						deferredLogin.resolve();
						console.log('[DEBUG] - deferredLogin.resolve() is called.')
					}
				});

	            loginWindow.addEventListener('exit', function (event) {
	            	if (!loginProcessed){
	                    // Handle the situation where the user closes the login window manually before completing the login process
	                    deferredLogin.reject({error: 'user_cancelled', error_description: 'User cancelled login process', error_reason: "user_cancelled"});
	                }
	            });				
			}
			else{ 
				loginWindow.onload = function(event){
					console.log("[DEBUG] - Login popup's load event is fired. window.location="+window.location);
					// TODO: Implement this. It might be usefull when running the app on desktop browser.
				};
			}

			return deferredLogin.promise;		
		}	
	}

	return SocialAuthBase;
});