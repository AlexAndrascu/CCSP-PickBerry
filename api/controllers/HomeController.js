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
		 console.log(req.session.access_token);


		if(!accessToken){
	      		console.log('accesstoken is null');
	           res.render("home/login", {
	            title: "login page",
	            
	            loginUrl: FB.getLoginUrl({ scope: 'public_profile' })
	          });
	      }
	      else{
	      		var user_name, user_id;
	      		FB.setAccessToken(accessToken);
	            FB.api('/me',{field:['id','name']}, function (response) {
				  if(!response || response.error) {
				    console.log(!response ? 'error occurred' : response.error);
				    return;
				  }
				  

				res.render("home/index",{
		            title: "News",
		            user_name: response.name,
		            user_id: response.id
	            
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
	            console.log("CODE: "+code);
	        },
	        function extendAccessToken(err, result) {
	            if(err) throw(err);
	            FB.napi('oauth/access_token', {
	                client_id:          FB.options('appId'),
	                client_secret:      FB.options('appSecret'),
	                grant_type:         'fb_exchange_token',
	                fb_exchange_token:  result.access_token
	            }, this);
	            console.log("TOKEN: "+result.access_token);
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

    logout: function(req, res){
    	console.log('fuck!');
	    req.session = null; 

	    console.log(req.session.access_token);// clear session


	   	res.redirect('/');


    }
};