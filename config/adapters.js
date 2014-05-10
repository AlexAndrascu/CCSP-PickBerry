module.exports.adapters = {
  'default': 'mongo',

  // mongo: {
  //   module: 'sails-mongo',
  //   host: 'localhost',
  //   port: 27017,
  //   user: '',
  //   password: '',
  //   database: 'test'
  // }
  mongo: {
    module: 'sails-mongo',
    url: "mongodb://heroku_app25064655:484rth5euaujg4ba9mmudnpc1f@ds029257.mongolab.com:29257/heroku_app25064655"
  }
};

