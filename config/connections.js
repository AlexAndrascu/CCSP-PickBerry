module.exports.connections = {
  mongo: {
    adapter: 'sails-mongo',
    url: process.env.MONGOLAB_URI,
    schema : true
  }
};

