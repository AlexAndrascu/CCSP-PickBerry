module.exports.connections = {
  mongo: {
    adapter: 'sails-mongo',
    url: 'mongodb://heroku_app25064655:484rth5euaujg4ba9mmudnpc1f@ds029257.mongolab.com:29257/heroku_app25064655',//process.env.MONGOLAB_URI,
    schema : true
  }
};