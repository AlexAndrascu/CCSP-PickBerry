module.exports = {
	index: function(req,res){
		res.view("home/index", {
         title: "HOME",
       });
	}
};