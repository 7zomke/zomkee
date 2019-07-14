//all middle ware goes ere
var middleWareObj = {}; 
var Campground = require("../models/camground");
var Comment = require("../models/comment");
middleWareObj.checkCampGroundOwnerShip =function (req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash("error", "Campground not found");
			res.redirect("back");
		}
		else
			{
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}
				else
				{
					req.flash("error", "you don't have permission to do that");
					res.redirect("back");
				}
			}
	});

	}
	else
		{
			req.flash("error", "you need tp be logged in to do that");
			res.redirect("back");
		}
}
;
middleWareObj.checkCommentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}
		else
			{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}
				else
				{
					req.flash("error","you don't have permission to do that");
					res.redirect("back");
				}
			}
	});

	}
	else
		{
			req.flash("error", "you need tp be logged in to do that");
			res.redirect("back");
		}
};
middleWareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	//not loggin
	//apear in next request
	req.flash("error", "you need to be logged in to do that");
	res.redirect("/login");
};
module.exports = middleWareObj;