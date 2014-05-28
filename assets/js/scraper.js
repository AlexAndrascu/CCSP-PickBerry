var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var db=[],news,newsid=1;
//var incomingurl = '', 測試用
var incomingurl = req.body,
	title,content,pic;

function newsscraper(media){
	request(incomingurl, function (err, res, html) {
		if (!err && res.statusCode == 200) {
			var $ = cheerio.load(html);
			switch(media){					
				case "apple":
				title = $('h1#h1').text();
				content = $('div.articulum p').text();
				pic = $('figure.sgimg').children('a').children('img').attr('src');
								break;
				
				case "et":
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

			
		}
	})
}


function writer(media){
	news = {				
				"url":incomingurl,
				"title":title,
				"content":content,
				"picture":pic
			};
	
	console.log('news Get')
}

//newsscraper("apple");  測試用
//newsscraper("china");  測試用
//newsscraper("et");  測試用

exports.appledaily = function (req, res) {newsscraper("apple")};
exports.chinatimes = function (req, res) {newsscraper("china")};
exports.ettoday = function (req, res) {newsscraper("et")};