
var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://pick-berry.herokuapp.com/';
config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '709607465770622',
    appSecret:      process.env.FACEBOOK_APPSECRET      || '4eba9bc35e9e690b963cae62a9831f2d',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'pickberry',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    || 'http://pick-berry.herokuapp.com/'
};

module.exports = config;