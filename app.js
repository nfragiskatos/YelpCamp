var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name: "Temp Campground 222222", 
//     image: "https://farm3.staticflickr.com/2763/4184577481_f1fdcb4252.jpg"
    
//     }, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND");
//             console.log(campground);
//         }
//     }
// );

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    // get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    
    //add to campgrounds array
    campgrounds.push({name: name, image: image});
    
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new"); 
});





app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp server has started!"); 
});