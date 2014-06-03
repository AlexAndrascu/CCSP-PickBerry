/**
 * ReasonController
 *
 * @description :: Server-side logic for managing reasons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodemailer = require("nodemailer");

module.exports = {
	mail_form: function(req,res){
		res.view("mailer/mailForm")
	},
	send_mail: function(req,res){
		var smtpTransport = nodemailer.createTransport("SMTP",{
		    service: "Gmail",
		    auth: {
		        user: "blueberrycollector@gmail.com",
		        pass: "ccsp2014"
		    }
		});
		var mailOptions = {
	    	// from: "<News Reporter>", // sender address   +report.owner.email
		    to: req.body.to,//report.owner.email+" , "+company.email // list of receivers
		    subject: req.body.title, // Subject line
		    text: req.body.content, // plaintext body
		    // html:  // html body
		}
		smtpTransport.sendMail(mailOptions, function(error, response){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + response.message);
		        res.send(response)
		    }
		    // if you don't want to use this transport object anymore, uncomment following line
		    smtpTransport.close(); // shut down the connection pool, no more messages
		});
	}
};