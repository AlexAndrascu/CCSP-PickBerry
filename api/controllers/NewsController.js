/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	show: function(req,res){
		var id = req.param("id");
		News.findOne({
			id: id
		}).exec(function (err, news) {
			if (err) {
				req.flash("info", "info: you point to wrong number");
				return res.redirect("/");
			}
			console.log(news)
			res.view("news/show", {
				content: news.content,
				imgurl: news.imgurl,
				url: news.url,
				hot: news.hot,
				reasons: news.reasons,
				comments: news.comments,
				parent_domain: news.parent_domain,
				news: news,
				content: news.content,
				title: news.title
			});
		});
	}
};

