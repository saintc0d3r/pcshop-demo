angular.module('pcshop.features.productitem.controllers')
	.config(function (ItemsDatasourceProvider, ConfigurationProvider) {
		ItemsDatasourceProvider.UseFakeDatasource = ConfigurationProvider.UseFakeDatasource;
	//ItemsDatasourceProvider.RestEndpoint = "http://dev1.xtremecodes.asia/api";	
		ItemsDatasourceProvider.RestEndpoint = ConfigurationProvider.RestEndpoint;
})
	.controller('ItemsController', function ($scope, $sce, $ionicModal, $ionicLoading,
											 $ionicActionSheet, $cordovaSocialSharing,
											 $timeout, $cordovaFacebook, ItemsDatasource) {
		$scope.items = [];

		/**
		 * A helper for pulling all items from data source
		 */
		var pull_items = function(callback) {
			 ItemsDatasource.get_all(function(items){
				$scope.items = items;
				$scope.$broadcast('scroll.refreshComplete');
				if (callback){
					callback();
				}
			 });
		},

		/**
		 *  Pull items at initial show.
		 */
		initial_pull_items = function(){
			$ionicLoading.show({
				content: 'Loading ...',
				animation: 'fade-in',
				showBackdrop: true
			});
			pull_items(function(){
				$ionicLoading.hide();
			});
		},

		/**
		 * Show youtube video modal
		 */
		show_youtube_video_modal = function (_scope) {
			if (_scope.youtube_video_modal != null) {
				_scope.youtube_video_modal.remove();
				_scope.youtube_video_modal = null;
			}

			if (_scope.youtube_video_modal == null) {
				var modalTemplate = 'app/features/productitem/views/youtube-player.html';
				var animation = 'slide-in-up';
				$ionicModal.fromTemplateUrl(modalTemplate, function (modal) {
					_scope.youtube_video_modal = modal;
					_scope.youtube_video_modal.show();
				}, {
					scope: _scope,
					animation: animation
				});
			}
		},

		/**
		 * A helper for sharing image's & link's urls to facebook
		 * @param imageUrl
		 * @param linkUrl
		 */
		doShareViaFacebookDeprecated = function (message, imageUrl, linkUrl) {
			var devicePlatform = device.platform;
			var canShareVia1stParam = 'facebook';
			if (devicePlatform == 'iOS') {
				canShareVia1stParam = 'com.apple.social.' + canShareVia1stParam;
			}
			else if (devicePlatform == 'Android') {
				// In android we Can't share both image & link to facebook. We prefer sharing link over image
				if (linkUrl) {
					imageUrl = null;
				}
			}
			$cordovaSocialSharing.canShareVia(canShareVia1stParam, message, "Share to Facebook", imageUrl, linkUrl).then(function (result) {
				$cordovaSocialSharing.shareViaFacebook(message, imageUrl, linkUrl);
			}, function (error) {
				alert("Error - Cannot share on Facebook:" + error);
			});
		},

		doShareViaFacebook = function(message, imageUrl, linkUrl){
			/**
			 * Show facebook sharing dialog
			 */
			var doShowSharingDialog = function(){
					var caption =
						"Sent from "+ window.device.manufacturer+" "+ window.device.model+" ( "+ window.device.platform+ " "+ window.device.version +" )";
					var shareOptions = {
						method: 'share',
						//name: "PC Shop",
						message: message,
						caption: caption,
						//description: "com.xtremecode.pcshopdemo | by xtremecode",
						href: linkUrl,
						picture: imageUrl
						},
						feedOptions ={
							method: 'feed',
							app_id: '748552275232677',
							link: linkUrl,
							picture: imageUrl,
							caption: caption
						};

					$cordovaFacebook.showDialog(feedOptions)
					.then(function(response){
							// showDialog method's success response
							console.log("[DEBUG] - Share to facebook: "+JSON.stringify(response));
						},
						function(response){
							// showDialog method's failing response
							console.log("[ERROR] - Share to facebook: "+JSON.stringify(response));
							// TODO: Show notification that sharing to facebook is failing
						}
					);
				},

				/**
				 * Show login dialog
				 * @param successCallback
				 */
				doFacebookLogin = function(successCallback){
					$cordovaFacebook.login(['public_profile','email','user_friends'])//['public_profile', 'publish_actions'])
						.then(function(response){
							console.log("[DEBUG] - Login to facebook: "+JSON.stringify(response));
							$cordovaFacebook.login(['publish_actions'])
								.then(function(){
									successCallback();
								}, function(response){
									console.log("[ERROR] - Login to facebook: "+JSON.stringify(response));
									// TODO: Show notification that sharing to facebook is failing
								});
						}, function(response){
							console.log("[ERROR] - Login to facebook: "+JSON.stringify(response));
							// TODO: Show notification that sharing to facebook is failing
						} );
				};

			// check facebook's login status 1st
			$cordovaFacebook.getLoginStatus()
				.then(function(response) {
						// getLoginStatus returns Success
						if (response.status === 'connected') {
							var uid = response.authResponse.userID;
							var accessToken = response.authResponse.accessToken;
							console.log("[DEBUG] - getLoginStatus method's response: uid=" + uid + "; accessToken=" + accessToken);

							doShowSharingDialog();
						}
						else {
							// getLogin's response status is not connected, try doing login
							doFacebookLogin(function () {
								doShowSharingDialog();
							});
						}
					}, function(response){
						// do facebook login
						doFacebookLogin(function () {
							doShowSharingDialog();
						});
					}
				);
		},

		/**
		 * A helper for sharing iamge & link's urls to twitter
		 */
		doShareViaTweeter = function (message, imageUrl, linkUrl) {
//			$cordovaSocialSharing.canShareVia("twitter", message, "Share to Twitter", imageUrl, linkUrl).then(function (result) {
				$cordovaSocialSharing.shareViaTwitter(message, imageUrl, linkUrl);
/*			}, function (error) {
				alert("Cannot share on Twitter:" + error +". Please ensure that you have installed Twitter app and has logged into your twitter account.");
			});
*/
		},

		doShareViaGplus = function (message, imageUrl, linkUrl) {
			var devicePlatform = device.platform;
			var sharedContent = message + " ";
			if (linkUrl) {
				sharedContent += linkUrl;
			}
			else {
				sharedContent += imageUrl;
			}

			if (devicePlatform == 'Android') {
				$cordovaSocialSharing.canShareVia("com.google.android.apps.plus", message, "Share to G+", imageUrl, linkUrl).then(function (result) {
					$cordovaSocialSharing.shareVia("com.google.android.apps.plus", sharedContent);
				}, function (error) {
					alert("Cannot share on G+:" + error);
				});
			}
	};

		/**
	 	* Refresh item feeds list when the user pull the list down.
	 	*/
		$scope.pull_to_refresh = function(){
			// TODO: Check the device whether it has a connectivity or not.
			pull_items();
		};

		/**
		 * Show an actions sheet when the user tap an item shown in the feeds list.
		 * @param selectedItem
		 */
		$scope.show_item_actions_sheet = function (selectedItem) {
			var selected_youtube_video_url = selectedItem.youtube_video_url;
			var selected_image_url = selectedItem.thumbnail;
			var selected_title = selectedItem.title;
			var shareButtons = [
				{text: 'Share to Facebook'},
				{text: 'Tweet'},
				{text: 'Share to Google +'},
				{text: 'Play Video'}
			];

			if (device.platform != 'android'){
				shareButtons.splice(2, 1);
			}

			var hideSheet = $ionicActionSheet.show({
				cancelText: 'Cancel', // TODO: replace literal with calls to label service
				buttons: shareButtons,
				buttonClicked: function (clickedButtonIndex) {
					switch (clickedButtonIndex) {
						case 0:
							console.log('Share to Facebook is tapped.');
							doShareViaFacebook(selected_title, selected_image_url, selected_youtube_video_url);
							break;
						case 1:
							console.log('Tweet is tapped.');
							doShareViaTweeter(selected_title, selected_image_url, selected_youtube_video_url);
							break;
						case 2:
							console.log('Share to Google+ is tapped.');
							doShareViaGplus(selected_title, selected_image_url, selected_youtube_video_url);
							break;
						case 3:
							if (selectedItem.youtube_video_url) {
								console.log('Playing youtube video from this url: ' + selected_youtube_video_url); //selectedItem.youtube_video_url);

								$scope.video_to_play = {
									youtube_video_url: $sce.trustAsResourceUrl(selected_youtube_video_url),//selectedItem.youtube_video_url),
									width: window.screen.width
								};
								show_youtube_video_modal($scope);
							}
							else {
								alert('The item does not have a video link.');
							}

							break;
				}
					return true;
				}
			});

		};

		/**
		 * Closing the shown player
		 */
		$scope.close_player = function () {
			console.log('[DEBUG] - closing video player.');
			if ($scope.youtube_video_modal == null) {
				return;
			}
			$scope.youtube_video_modal.hide();
			$scope.youtube_video_modal.remove()
				.then(function () {
					$scope.youtube_video_modal = null;
				});
		};

	// Pull items at initial show. 
	initial_pull_items();
	// TODO: Check the device whether it has a connectivity or not.	// 

});