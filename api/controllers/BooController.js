/**
 * BooController
 *
 * @description :: Server-side logic for managing boos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	verifyBoo: function(req, res){
		Boo.findOne({
			owner: req.body.userid,
			parent_news: req.body.newsid
		}).exec(function(err, boo){
			console.log(boo);
			if(boo){
				res.send({
					booed: true
				})
			}else{
				res.send({
					booed: false
				})
			}
		})
	}
};

