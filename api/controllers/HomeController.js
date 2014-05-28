module.exports = {
	index: function(req,res){
		console.log(process)
		res.view("home/index", {
         title: "HOME",
       });
	}
};