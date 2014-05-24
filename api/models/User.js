/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: 'string'
  	education: 'string',
  	email: 'string',
  	job:'string',
  	sex:'string',
  	friends: 'string',
  	
  	reports:{
  		collection: 'report',
  		via: 'owner'
  	},

  	comments:{
  		collection: 'comment',
  		via: 'owner'
  	},
  	
  	reasonsmaker:{
  		collection: 'reason',
  		via:'owner'
  	},

  	reasonsuser:{
  		collection: 'reason',
  		via:'voters',
  		through:'reasonvoter'
  	}

  }
};

