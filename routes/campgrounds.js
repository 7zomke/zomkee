var express = require("express");
var router  = express.Router();
var Campground = require("../models/camground");
var middleware = require("../middleware/index.js");
router.get("/",function(req,res){
	
	// res.render("campgrounds",{campgrounds:campgrounds});
	Campground.find({}, function(err,acampgrounds){
		if(err)
			{
				console.log(err);
			}
		else
			{
				res.render("campgrounds/index",{campgrounds:acampgrounds, currentUser: req.user});
			}
	});
});
///new
router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new.ejs");
});
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
			{
				console.log(err);
			}
		else {
			console.log(foundCampground);
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
	// req.params.id;
});
/// add new campground to db
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name,price: price, image: image, description: description, author: author};
	// newCampground.author.id = 
	// newCampground.author.username = 
	// campgrounds.push(newCampground);
	//create new campground and save to db
	Campground.create(newCampground,function(err,newlycreated){
		if(err){
			console.log(err);
		}
		else {
			console.log(newlycreated);
			res.redirect("/campgrounds");
		}
	});
	// res.redirect("/campgrounds");
});
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampGroundOwnerShip, function(req, res){
	//is someone logged in
	
		Campground.findById(req.params.id, function(err, foundCampground){
		
					res.render("campgrounds/edit", {campground : foundCampground});
				
		});	
	//if not redirect somewhere
	
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampGroundOwnerShip, function(req, res){
	
	Campground.findByIdAndUpdate(req.params.id, req.body.campground , function(err, updateCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else
			{
				res.redirect("/campgrounds/" + req.params.id);
			}
	});
});
///destroy
router.delete("/:id",middleware.checkCampGroundOwnerShip, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else
			{
				res.redirect("/campgrounds");
			}
	});
});


module.exports = router;