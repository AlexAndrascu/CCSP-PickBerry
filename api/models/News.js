/**
 * News
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  // schema : true,
  attributes: {

  	/* e.g.
  	nickname: 'string'
  	*/
  	title: 'string', //標題
  	content: 'string',//內容
    imgurl: 'string',//圖片
    url:'string', //連結網址
    hot:'integer',//熱門程度 點閱率

  	reasons:{      //檢舉理由
  		collection: 'reason',
      via: 'parent_news'
  	},

    comments:{        //評論
      collection: 'comment',
      via: 'com_news'
    },

    parent_domain:{  //哪家新聞台
      model: 'company'
    }


  }
};
