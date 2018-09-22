var express = require("express");
var app = express();
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/709/23277997680_b812daf6b5.jpg"},
        {name: "Granite Hill", image: "https://farm3.staticflickr.com/2763/4184577481_f1fdcb4252.jpg"},
        {name: "Mountain Goats Rest", image: "https://farm4.staticflickr.com/3656/3600206210_d7819721a2.jpg"}
    ];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
     res.render("campgrounds", {campgrounds: campgrounds});
});





app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp server has started!"); 
});