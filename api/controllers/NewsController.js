/**
 * PostController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {


  /**
   * Action blueprints:
   *    `/post/form`
   */

  create: function (req, res) {

    var title = req.body.title;

    // Send a JSON response
    News.create({
      title: title,
      // content: content
    }).exec(function (err, post) {
      if (err) {
        return res.err();
      }

      req.flash('info', 'info: Create post success !!!');
      res.redirect("/");
    });
  },


  /**
   * Action blueprints:
   *    `/post/destroy`
   */
   destroy: function (req, res) {

    // Send a JSON response
    var id = req.param("id");

     News.findOne({
       id: id
     }).exec(function (err, news) {
       if (err) {
         req.flash("info", "info: you point to wrong number");
         return res.redirect("/");
       }
       console.log(news)
       news.destroy(function(err){
        req.flash("info", "destroy");
       })
     return res.redirect("/");
     });
  },

   updatePage: function (req, res) {
     var id = req.param("id");

     News.findOne({
       id: id
     }).exec(function (err, news) {
       if (err) {
         req.flash("info", "info: you point to wrong number");
         return res.redirect("/");
       }
       console.log(news)
       return res.view("home/update", {
         news: news
       });
     });
   },

  /**
   * Action blueprints:
   *    `/post/update`
   */
   update: function (req, res) {
    var id = req.param("id");
    var title = req.body.title;
    // var content = req.body.content

    if (title  && title.length > 0) {
      // update post
      News.update({
        id: id
      }, {
        title: title,
      })
      .exec(function (err,  news) {
        if (err) {
          req.flash("info", "info: you point to wrong number");
          return res.redirect("/");
        }
        return res.redirect("/news/get/" + id);
      })
      return;
    }
    return res.redirect("/");

    // // Send a JSON response
    // return res.json({
    //   hello: 'world'
    // });
  },


  /**
   * Action blueprints:
   *    `/post/list`
   */
   list: function (req, res) {

    // Send a JSON response

    News
    .find({})
    .sort('updatedAt DESC')
    .exec(function (err, newses) {
      return res.view("home/index", {
        title: "home page - title",
        newses: newses
      });
    });
  },


  /**
   * Action blueprints:
   *    `/post/get`
   */
   get: function (req, res) {
     var id = req.param("id");
     // if (isNaN(id)) {
     //   req.flash("info", "info: you point to wrong number");
     //   return res.redirect("/");
     // }

     News.findOne({
       id: id
     })
     .sort('updatedAt desc')
     .exec(function (err, news) {
       res.view("home/page", {
         title: news.title + " - blog post",
         news: news
       });
     });
    // Send a JSON response
  },

  api_get: function(req,res) {
    News
    .find({})
    .sort('updatedAt DESC')
    .exec(function (err, newses) {
      res.send(newses)
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PostController)
   */
  _config: {}


};
