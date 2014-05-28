/**
 * GoogleController
 *
 * @description :: Server-side logic for managing googles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getUri: function(req, res){

		console.log("HEY!!!!!!!!!AJAX!!!");
		console.log(req.body);
		var request = require('request');
		var cheerio = require('cheerio');
		
		
		var db=[],news,newsid=1;
		//var incomingurl = '', 測試用
		var incomingurl = req.body.Uri,
			title,content,pic, media = "nothing";


		switch(req.body.Uri.split('/')[2]) {
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
			request(incomingurl, function (err, res, html) {
				console.log(err);


				if (!err && res.statusCode == 200) {
					console.log("i come in!");
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
						console.log("NONE");
						
					};

					console.log("TITLE: " + title);
				}
			})

		}



		


	}
};

