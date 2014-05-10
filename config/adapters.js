module.exports.adapters = {
  'default': 'mongo',

  mongo: {
    module: 'sails-mongo',
    host: 'fucknews.herokuapp.com',
    port: 27017,
    url: process.env.DB_URL,
    schema: true
  }
};

