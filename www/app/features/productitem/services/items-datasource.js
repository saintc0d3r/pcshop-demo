angular.module('pcshop.features.productitem.services')
	.provider('ItemsDatasource', function(){
		this.UseFakeDataource = false;
		this.RestEndpoint = ''; 

		this.$get = ['$resource', function($resource){
			// return fake items datasource
			if (this.UseFakeDatasource){
				// Create and return the fake items-datasources stub
				return {
					/**
					 * Get all fake items
					 */
					get_all : function(callback){
						var youtube_video_url_template_url = "http://www.youtube.com/embed/{vid_id}?autoplay=1";
						var fakeItems = [
						    {
						      "title": "Intel Core i7-4790K Haswell",
						      "description": "Desktop i7 Quad-Cores CPU @ 4.0GHz LGA 1150",
						      "price": 339.99,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_i7_4790K.jpg",
								"id": "54544c9bc6c73d2c04542c6a",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'tmGylx407-Q')
						    },
						    {
						      "title": "SAMSUNG 840 EVO MZ-7TE500BW",
						      "description": "2.5' 500GB SATA III TLC Internal Solid State Drive",
						      "price": 239.99,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_samsung_evo840_500gb_ssd.jpg",
								"id": "54544cbac6c73d2c04542c6b",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'sfUe81ThddM')
							},
						    {
						      "title": "ASUS RAMPAGE V EXTREME LGA 2011-v3",
						      "description": "Intel X99 SATA 6Gb/s USB 3.0 Extended ATX",
						      "price": 473.99,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_asus_rampageV_extreme_lga2011v3_mobo.jpg",
								"id": "54544cd0c6c73d2c04542c6c",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'YQEca7RlGS0')
							},
						    {
						      "title": "G.SKILL Ripjaws X Series 8GB ",
						      "description": "(2 x 4GB) 240-Pin DDR3 SDRAM DDR3 1600 (PC3 12800) Desktop RAM Modules",
						      "price": 70,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_gskill_ripjaws_8gb_DDR3_1600.jpg",
								"id": "54544ce2c6c73d2c04542c6d",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'SaKJ9QE2bXM')
						    },
						    {
						      "title": "CORSAIR CXM series CX600M 600W ATX12V v2.3 SLI CrossFire",
						      "description": "80 PLUS BRONZE PSU",
						      "price": 69.99,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_corsair_cx600M_psu.jpg",
								"id": "54544cf1c6c73d2c04542c6e",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'f-YhEv_D4M4')
						    },
						    {
						      "title": "AMD FX-8350 Black Edition Vishera 8-Core 4.0GHz (4.2GHz Turbo) ",
						      "description": "AMD Desktop CPU Socket AM3+ 125W",
						      "price": 179.99,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_amd_fx8350_black.jpg",
								"id": "54544d27c6c73d2c04542c6f",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'g64YJj2UQuA')
						    },
						    {
						      "title": "GIGABYTE GA-990FXA-UD3 AM3+",
						      "description": "AMD 990FX + SB950 SATA 6Gb/s USB 3.0 ATX AMD Mainboard",
						      "price": 126,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_gigabyte_ga-990fxa_am3plus.jpg",
								"id": "54544d3bc6c73d2c04542c70",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'DvWD0_14rbM')
						    },
						    {
						      "title": "Acer H6 Series H236HLbid Black",
						      "description": "23' 5ms (GTG) HDMI Widescreen LED Backlight LED",
						      "price": 139.99,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_acer_H6_led_screen.jpg",
								"id": "54544d5cc6c73d2c04542c71",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'BwuogPGcX5I')
						    },
						    {
						      "title": "Intel Core i7-5960X Haswell-E ",
						      "description": "8-Core 3.0GHz LGA 2011-v3 140W Desktop Processor",
						      "price": 1049.99,
						      "thumbnail": "https://s3-ap-southeast-1.amazonaws.com/pc-shop-demo/thumb_i7_5960X.jpg",
								"id": "54544d69c6c73d2c04542c72",
								"youtube_video_url": youtube_video_url_template_url.replace('{vid_id}', 'uLZ9JClrsMo')
						    }							
						];
						if (callback) {	callback(fakeItems); }
					},

					/**
					 * Fake post item method
					 */
					post_new_item: function(new_item, callback){
						// TODO: Implement the fake post item
					}
				}
			}

			// return actual items datasource stub
			var that = this,
				Item = $resource(this.RestEndpoint+'/items', {});
			return {
				
				/**
				 * Get all items from REST endpoint
				 */
				get_all: function(callback){
					Item.query(function(response){
						if (callback) {	callback(response); }
					});	
				},

				/**
				 * Post new_item into REST endpoint.
				 */
				post_new_item: function(new_item, callback){
					var post_item = new Item({});
					post_item.title = new_item.title;
					post_item.description = new_item.description;
					post_item.price = new_item.price;
					post_item.thumbnail = new_item.thumbnail;
					post_item.$save(function(saved_item, response){
						if (callback){
							// TODO: Wrap server's response
							var response = {};						
							callback(response);
						}						
					});
				}
			}
		}];
	});