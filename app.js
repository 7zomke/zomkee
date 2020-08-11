var express = require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/camground");
var seedDB = require("./seed");
var Comment = require("./models/comment");
var User = require("./models/user");
var flash = require("connect-flash");
var methodOverride = require("method-override");
app.use(express.static(__dirname+"/public"));

var commentRoutes = require("./routes/comments"),
	camgroundRoutes = require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");
// function seedDB(){
// 	Campground.remove({}, function(err){
// 		if(err)
// 			{
// 				console.log(err);
// 			}
		
// 				console.log("remove");
		
// 	});
// };
// seedDB(); //seed the database
//PASSPORT CONFIGURATION
app.use(require("express-session")({
		secret: "Bla bla di du",
		resave: false,
		saveUnitialized : false
		}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

console.log(process.env.DATABASEURL);

 mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});
// mongodb+srv://<username>:<password>@yelpcamp-peccl.mongodb.net/test?retryWrites=true&w=majority
// mongoose.connect("mongodb+srv://zomke:041099@yelpcamp-peccl.mongodb.net/test?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(function(req, res, next){ 
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", camgroundRoutes);
app.use("/", indexRoutes);

// Campground.create({	name :"zomeke",
// 				   image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9pqY9GH2s54SFD_oD1sJDDXn8oNRF0FbYUENDgRM_rkcVw9e",
// 				   description: "No idea what the heck is going on"
// 				  },function(err,campground){
// 	if(err)
// 		{
// 			console.log(err);
// 		}
// 	else {
// 		console.log("newly create camground");
// 		console.log(campground);
// 	}
// });
// var campgrounds = [
// 		{	name :"zomeke", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9pqY9GH2s54SFD_oD1sJDDXn8oNRF0FbYUENDgRM_rkcVw9e"},
// 		{	name :"cuta", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9pqY9GH2s54SFD_oD1sJDDXn8oNRF0FbYUENDgRM_rkcVw9e"},
// 		{	name :"kaka", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9pqY9GH2s54SFD_oD1sJDDXn8oNRF0FbYUENDgRM_rkcVw9e"},
// 		{	name :"koka", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyECK1F6SpHx7sgO-UzssKSnXDd6G6cvWHX-L-UzVVLettnxGO"}
// 	];



/////////////////////////////////////////
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});