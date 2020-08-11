var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Comment = require("../models/comment");
var Campground = require("../models/camground");
var middleware = require("../middleware/index.js");
router.get("/",function(req,res){
	res.render("landing");
});



/////////////////////////////////
///AUTH ROUTE
//REGISTER FORM
router.get("/register", function(req, res){
	res.render("register");
});
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err)
			{
				req.flash("error",err.message);
				return res.render("register");
			}
		passport.authenticate("local")(req, res, function(){
			req.flash("success","welcome to yelpcamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});
//LOGIN FORM
router.get("/login", function(req, res){
	res.render("login");

});
// app.post("/login", middleware, callback);
router.post("/login",passport.authenticate("local",{successRedirect: "/campgrounds", 
												failureRedirect:"/login"}) ,function(req, res){
	// req.flash("success","login successfullt ");
	});
////LOGOUT 
router.get("/logout", function(req, res){
		req.logout();
		req.flash("success","logged you out");
		res.redirect("/campgrounds");
	});
router.get("/results", function(req, res){
	var a = req.query.search;
	res.redirect("/campgrounds/"+a);
});
// router.get("/user",function(req,res){
// User.find({}, function(err,auser){
// 		if(err)
// 			{
// 				console.log(err);
// 			}
// 		else
// 			{
// 				res.render("/user",{user:auser, currentUser: req.user});
// 			}
// 	});
// });
 // router.get("/profile",function(req,res){
 // res.render("campgrounds/user",{ currentUser: req.user, currentComment: req.comment});
 // });

router.get("/profile",middleware.isLoggedIn,function(req,res){
	
	// res.render("campgrounds",{campgrounds:campgrounds});
	Comment.find({}, function(err,comment){
		if(err)
			{
				console.log(err);
			}
		else
			{
				
				res.render("campgrounds/user",{comment:comment, currentUser: req.user});
			}
	});
	// res.render("campgrounds",{campgrounds:campgrounds});
	// Campground.find({}, function(err,acampgrounds){
	// 	if(err)
	// 		{
	// 			console.log(err);
	// 		}
	// 	else
	// 		{
	// 			res.render("campgrounds/user",{campground:acampgrounds, currentUser: req.user});
	// 		}
	// });
});
router.get("/anhdong", function(req, res){
	res.render("anhdong");
});


module.exports = router;