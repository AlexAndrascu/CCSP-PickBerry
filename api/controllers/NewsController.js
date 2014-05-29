/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	addNews: function(req,res){
		console.log(req.body);
		var request = require('request');
		var cheerio = require('cheerio');
		var db=[],news,newsid=1;
		//var incomingurl = '', 測試用
		var incomingurl = req.body.uri,
			title,content,pic,exist, media = "nothing";
		switch(req.body.uri.split('/')[2]) {
		case 'www.appledaily.com.tw':
			media = "apple";
			break;
		case 'www.chinatimes.com':
			media = "china";
			break;
		case 'www.ettoday.net':
			media = "et";
			break;
		default:
			console.log('NOT media OR unscrapable!')
		}
		if(media != "nothing"){
			console.log("media: " + media);
			request(incomingurl, function (err, resb, html) {
				if (!err && resb.statusCode == 200) {
					console.log("Load the page successfully!");
					var $ = cheerio.load(html);
					switch(media){
						case "apple":
							title = $('h1#h1').text();
							content = $('div.articulum p').text();
							pic = $('figure.sgimg').children('a').children('img').attr('src');
							break;
						case"et":
							title = $('h2.title').text();
							content = $('div.story p').nextUntil('div').text();
							pic = $('div.story img').attr('src');
							break;
						case "china":
							title = $('header').children('h1').text();
							content = $('article.clear-fix p').text();
							pic = $('div.pic img').attr('src');
							break;
						default:
							console.log("Scrap nothing!");
					};
					News.find({
						title: title,
						media: media,
						content: content
					})
					.exec(function(err, news){
						console.log(news)
						if(news.length == 0){
							exist = 0;
							News.create({
								title: title,
								media: media,
								content: content,
								imgurl: pic
							}).exec(function(err,create_news){
								console.log(create_news)
								console.log("not found")
							})
						}
						else{
							console.log("found")
							exist = 1;
						}
						res.end({
							news:news
						});
					});
				}
			})
		}
	},
	show: function(req,res){
		var id = req.param("id");
		News.findOne({
			id: id
		}).exec(function (err, news) {
			if (err) {
				req.flash("info", "info: you point to wrong number");
				return res.redirect("/");
			}
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

