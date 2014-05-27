var FB = require('fb');
var Step = require('Step');
var config = require('../../config/local');

FB.options({
    appId:          config.facebook.appId,
    appSecret:      config.facebook.appSecret,
    redirectUri:    config.facebook.redirectUri
});

module.exports = {
	index: function(req,res){
		var accessToken = req.session.access_token;
		var session_id = req.session.fbid;
		 


		if(!accessToken){
	      		console.log('accesstoken is null');
	           res.render("home/login", {
	            title: "login page",
	            
	            loginUrl: FB.getLoginUrl({ scope: 'public_profile,user_photos' }),
	            
	          });
	      }
	      else{
	      		
	      		FB.setAccessToken(accessToken);
	            FB.api('/me',{field:['id','name','photos']}, function (response) {
				  if(!response || response.error) {
				    console.log(!response ? 'error occurred' : response.error);
				    return;
				  }

				

				User.findOne()
					.where({fbid: response.id})
					.where({name: response.name})
					.exec(function(err,users){
						if(err) throw err;
						if(!users){
							console.log('Find nothing...');
							User.create({fbid: response.id, name: response.name})
								.exec(function(err,user){
									console.log("Create user: "+user.name);
								});
						}
						else{
							console.log("Get user:" +users.name);

						}
					})
				
				

				res.render("home/index",{
		            title: "News",
		            user_name: response.name,
		            user_id: response.id,
		            user_photo: response.photos
	            
	          	});
			});
	          
	           
	          
	          
	      }

      
    },

    fblogin: function(req, res, next){
    	var code            = req.query.code;

	    if(req.query.error) {
	        // user might have disallowed the app
	        return res.send('login-error ' + req.query.error_description);
	    } else if(!code) {
	        return res.redirect('/');
	    }

	    Step(
	        function exchangeCodeForAccessToken() {
	            FB.napi('oauth/access_token', {
	                client_id:      FB.options('appId'),
	                client_secret:  FB.options('appSecret'),
	                redirect_uri:   FB.options('redirectUri'),
	                code:           code
	            }, this);
	            
	        },
	        function extendAccessToken(err, result) {
	            if(err) throw(err);
	            FB.napi('oauth/access_token', {
	                client_id:          FB.options('appId'),
	                client_secret:      FB.options('appSecret'),
	                grant_type:         'fb_exchange_token',
	                fb_exchange_token:  result.access_token
	            }, this);
	            	        },
	        //set session
	        function (err, result) {
	            if(err) return next(err);

	            
	            req.session.access_token    = result.access_token;
	            req.session.expires         = result.expires || 0;

	            
	            res.redirect('/');
	            
	        }
	    )


    },

    
};