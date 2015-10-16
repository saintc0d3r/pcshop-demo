angular.module('pcshop.core.services')
	.service('Modals', ['$ionicModal', function($ionicModal){
		var login_signup_modal = null;

		/**
		 * A helper for creating modal view.
		 */
		var create_modal_view = function(modalTemplate, _scope, _animation, callback ){
			var modalTemplate = modalTemplate;
			$ionicModal.fromTemplateUrl(modalTemplate, function(modal){
				if (callback) {callback(modal);}
			}, {
				scope: _scope,
				animation: _animation
			});
		}

		/**
		 * Show login & signup landing view.
		 */
		this.show_login_signup_modal = function(_scope){
			if (login_signup_modal == null){
				create_modal_view('app/core/views/login-signup.html', _scope, 'slide-in-up', 
					function(modal){
						login_signup_modal = modal;
						login_signup_modal.show();
					});
			}
			else{
				login_signup_modal.show();
			}
		}

		/**
		 * Hide login & signup landing view.
		 */
		this.hide_login_signup_modal = function(){
			login_signup_modal.hide();
		}
	}]);