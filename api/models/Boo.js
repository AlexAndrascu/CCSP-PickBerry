/**
* Boo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	owner:{
  		model:'user'
  	},

  	parent_news:{             //原始的新聞
  		model:'news'
  	},

  }
};
