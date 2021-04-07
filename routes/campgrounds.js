var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


// Get all Campgrounds from DB

router.get("/", function(req,res){

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds});
        }
    });

    // res.render("campgrounds.ejs", {campgrounds:campgrounds});
});

router.post("/", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username : req.user.username
    }
    var newCampground = {name:name, price: price, image:image, description: desc, author: author}
    // Create a new campground and save it to DB

    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});

// SHOW-- Shows more information about the campground

router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show.ejs", {campground: foundCampground});
        }
    });
    
});

// EDIT Campground ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit.ejs", {campground: foundCampground});
               
        });
});

// UPDATE Campground ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    
     Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
         if(err){
             res.redirect("/campgrounds");
         }else{
             res.redirect("/campgrounds/" + req.params.id);
         }
     });
});

// DESTROY Campground ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports= router;

// Colt has used the isLoggedIn code in v9. I used it in v8 as Well . Just for my reference