
var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://localhost:1337/';
config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '304509973038784',
    appSecret:      process.env.FACEBOOK_APPSECRET      || 'ff494cde96a00883bb49f357c94e576b',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'pickberry',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    || 'http://localhost:1337/'
};

module.exports = config;