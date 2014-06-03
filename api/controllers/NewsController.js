/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request')
var nodemailer = require("nodemailer");

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
					Company.find({
						name: media
					}).exec(function(err,company){
						News.find({
							title: title,
							media: media,
							content: content
						})
						.exec(function(err, news){
							if(err){
								console.log(err)
							}
							console.log(news)
							if(news.length == 0){
								exist = 0;
								News.create({
									title: title,
									media: media,
									parent_domain: company,
									content: content,
									imgurl: pic,
									url: incomingurl
								}).exec(function(err,news){
									console.log(news)
									console.log("not found")
									res.send({
										news: news
									});
								})
							}
							else{
								console.log("found")
								exist = 1;
								res.send({
									news: news
								});
							}
						});
					})
				}
			})
		}
	},

	reportThisNews: function(req,res){
		console.log(req.session.user)
		Report.create({
			content: req.param('content'),
			rep_news: req.param('id'),
			owner: req.session.user
		}).exec(function(e,report){
			Report.findOne({
				content: report.content,
				rep_news: report.rep_news,
				owner: report.owner
			}).populate('owner')
			.populate('rep_news').exec(function(e,report){
				Company.findOne({
					name: report.rep_news.media
				}).exec(function(err,company){
					var smtpTransport = nodemailer.createTransport("SMTP",{
					    service: "Gmail",
					    auth: {
					        user: "blueberrycollector@gmail.com",
					        pass: "ccsp2014"
					    }
					});
					var mailOptions = {
					    from: report.owner.email, // sender address
					    to: "how2945ard@gmail.com",//report.owner.email+","+company.email // list of receivers
					    subject: "Hello ✔", // Subject line
					    text: report.content, // plaintext body
					    // html:  // html body
					}
					smtpTransport.sendMail(mailOptions, function(error, response){
					    if(error){
					        console.log(error);
					    }else{
					    	report.sent = true
					        console.log("Message sent: " + response.message);
					    }

					    // if you don't want to use this transport object anymore, uncomment following line
					    smtpTransport.close(); // shut down the connection pool, no more messages
					    res.view('reports/sent',{
					    	id: report.rep_news.id,
							content: report.rep_news.content,
							imgurl: report.rep_news.imgurl,
							url: report.rep_news.url,
							reasons: report.rep_news.reasons,
							comments: report.rep_news.comments,
							parent_domain: report.rep_news.parent_domain,
							news: report.rep_news,
							content: report.rep_news.content,
							title: "Report "+report.rep_news.title
					    })
					});
				})
			})
		})

		// request.post('https://www.win.org.tw/cap/pleadSend_010401.jsp',{
		// 	form:{
		// 		'src_type':'9',
		// 		'protect':'9',
		// 		'Classification':'6.4',
		// 		'PleadURL':'',
		// 		'Description':'',
		// 		'countdown':'300',
		// 		'Name':'HOwearfd',
		// 		'eMail':'how2945ard@gmail.com',
		// 		'Sex':'Male',
		// 		'submit.x':'85',
  // 			'submit.y':'7'
		// 	},
		// 	header:{
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 		'Referer': 'http://www.win.org.tw/iwin/report.html'
		// 	}},
		// 	function(e,r,body){
		// 		res.redirect('/');
		// })
	},



	show: function(req,res){
		var id = req.param("id");
		News.findOne({
			id: id
		}).populate('reports')
		.populate('reasons')
		.populate('comments').exec(function (err, news) {
			if (err) {
				req.flash("info", "info: you point to wrong number");
				return res.redirect("/");
			}
			console.log(news.comments[0].owner)
			res.view("news/show", {
				id: news.id,
				content: news.content,
				imgurl: news.imgurl,
				url: news.url,
				hot: news.hot,
				reasons: news.reasons,
				comments: news.comments,
				comments_user: news.comments.owner,
				parent_domain: news.parent_domain,
				news: news,
				content: news.content,
				title: news.title
			});
		});
	}
};

