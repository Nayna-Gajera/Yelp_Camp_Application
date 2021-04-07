
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Seagot, Wayanad", 
        image: "https://www.holidify.com/images/cmsuploads/compressed/640px-ENTRANCEBANASURA_20190213093247.jpg",
        description: "Wayanad is a beautiful place in Kerala which is a favourite among travel enthusiasts. The Seagot Camp is built on the largest Earth dam in India, the Banasura Dam. This alone makes it a unique place to visit. Surrounded by the tropical rainforest, camping in the splendid Wayanad region is an experience of a lifetime. It is a perfect place for the adventure lovers with a host of activities like trekking, angling, swimming, team building, and open-air barbecue."
    },
    {
        name: "Magpie Camp, Chopta", 
        image: "https://www.holidify.com/images/cmsuploads/compressed/adventure-camp-camping-699558_20190212181323.jpg",
        description: "Chopta is one destination which has recently made it to the list of the best offbeat destination in the country. It is a little place tucked away in the Garhwal Mountains and is the best retreat to beat the summer heat. The Magpie Camp in Chopta lets you experience this place in its true form. The view of the surrounding valley and mountains is enough to take your breath away. There are several tourist sites here like the Chandrashila Peak, Deoria Tal, and Tungnath Temple. This is one place which deserves your time."
    },
    {
        name: "Camp Rapidfire, Rishikesh", 
        image: "https://www.holidify.com/images/cmsuploads/compressed/472343086_418752c381_z_20190213123146.jpg",
        description: "Camp Rapidfire is located along the mighty Ganga in Rishikesh, which is an adventure lover’s haven. It is a river beach camp which means that it is situated on a large tract of white sand along the river banks. This sure is as exciting and peaceful as it sounds with ample opportunity to laze out in the sun and hear the Ganga flowing by. Being the most popular rafting destination, there is no dearth of adventure activities in Rishikesh. There is no electricity at this camp which is lighted by kerosene lamps after sunset, giving it a completely ethereal feel. It is a complete bliss to observe the stars at night and pass your time away from the noise of the crowded cities."
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;