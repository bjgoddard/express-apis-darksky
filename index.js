// Require node modules that you need
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var geocoder = require('simple-geocoder');

// Declare your app
var app = express();

// Tell express what view engine you want to use
app.set('view engine', 'ejs');

// Include any middleware here
app.use(layouts);
app.use(express.static('static'));
app.use(parser.urlencoded({ extended: false }));

// Declare routes
app.get('/', function(req, res){
  res.render('home');
});

app.post('/result', function(req, res){
  let location = req.body.location
  geocoder.geocode(req.body.location, function(success, locations) {
    if(success) {
      let coords = [locations.x.toFixed(2), locations.y.toFixed(2)]
      res.render('result', {location: location, coords: coords });
      console.log("Location: ", locations.x, locations.y);
    }
  });



  
});

// Listen on PORT 3000
app.listen(3000, function(){
  console.log('I\'m listening to the smooth sounds of port 3000 in the morning. ☕');
});
