const express = require("express");
const logger = require("morgan");
const path = require("path"); //baked in from node
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //this tells express to use view engine and use ejs

//logger (or morgan) will log to your node env(Server)
   //what type of req is being made i.e. get, post etc. 
   //the params inputted 
   // success or error number (200, 304, 500, 404, etx) 
   
app.use(logger("dev"));
app.use(express.json());//this gives our backend the opportunity to parse JSON
app.use(express.static(path.join(__dirname, "public")));

/*
Middleware(Above)
   it means what abilities this app is using
*/

//making a GET request
app.get('/', function(req, res){
   // res.json({
   //    name: "hamster",
   //    friends: ['tom', 'eli'],
   //    food: {
   //       food1: "burger",
   //       food2: "soup"
   //    }
   // })

   //now that we have ejs we well switch to res.render
   res.render("index", {user: "Master Wayne"});//because of path and ejs we are now RENDERING what is in the /views/index.ejs file
});

app.get('/clothing', function(req, res){
   res.json({
      price: 100,
      type: "t-shirt",
   })
});

//make your get dynamic using colon
app.get('/:product', function(req,res){
   res.json({
      price: 100,
      type: req.params.product,//this will come from what is typed as the url/:product so /jeans will make the type: jeans
   })
});

//using POST to create
app.post('/create-product', function (req,res){
   console.log(req.body)
   res.json({
      data: req.body,
   })
});

/* Essentially, don't think of this in the scope of the APIs you use from online (weather, maps, movies). This will come in handy with finding users in the backend you will make for your applications. */



app.listen(3000, function(){
   console.log(`Server is running on PORT: ${3000}`);
})


/*
M-Model: the database
V-View: client and what is on screen
C-Controller: how the logic is handled

EJS
   A Template engine that we learned as a precursor for React.js (or angular for those who use that)
   This pulls all the data, while React only pulls data that is changed.
*/