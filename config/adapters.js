module.exports.adapters = {
  'default': 'mongo',

  mongo: {
    module: 'sails-mongo',
    url: "mongodb://@fucknews.herokuapp.com:27017/db",
    schema: true
  }
};

