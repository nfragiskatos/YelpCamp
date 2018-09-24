//==========================================
// ** RESTFUL Routing Setup **
//==========================================
// RESTful routing organizational technique/pattern to help perform CRUD


// name     url                 verb    desc.
//---------------------------------------------------------------
// INDEX    /campgrounds        GET     Display a list of all dogs
// NEW      /campgrounds/new    GET     Displays a form to make a new dog
// CREATE   /campgrounds        POST    Add a new dog to DB
// SHOW     /campgrounds/:id    GET     Show info about one campground

// ** Nested Routes
// NEW      /campgrounds/:id/comments/new
// CREATE   /campgrounds/:id/comments


var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");
    
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX route - show all campgrounds
app.get("/campgrounds", function(req, res) {
    // get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

// CREATE route - add new campground to DB
app.post("/campgrounds", function(req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    //add to campgrounds array
    Campground.create(
        {
            name: name, 
            image: image,
            description: desc
        }, function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added a new campground");
                console.log(campground);
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
            }
        }
    );
});

// NEW route - show form to create campground in DB
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new"); 
});

// SHOW - Show info about one campground
//  ** This route technically NEEDS to be under /campgrounds/new 
//      since campgrounds/new would fit this pattern.
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//=======================================
// COMMENTS routes
//=======================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});     
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    // lookkup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    // create new comment
    // connect new comment to campground
    // redirect back to show page of campground we are on.
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp server has started!"); 
});