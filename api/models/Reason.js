/**
* Reason.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	content:'string',
  	vote: 'integer',

  	owner:{
  		model:'user'
  	},

  	parentnews:{             //原始的新聞
  		model:'news'
  	},

  	voters:{                  //投票者
  		collection: 'user',
  		via: 'reasonsuser',
  		through: 'reasonvoter'
  	}

  }
};

