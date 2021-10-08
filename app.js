const express = require("express");
const logger = require("morgan");

const app = express();

//logger (or morgan) will log to your node env(Server)
   //what type of req is being made i.e. get, post etc. 
   //the params inputted 
   // success or error number (200, 304, 500, 404, etx) 
   
app.use(logger("dev"));

//making a GET request
app.get('/', function(req, res){
   //res.send('Hello Class');
   res.json({
      name: "hamster",
      friends: ['tom', 'eli'],
      food: {
         food1: "burger",
         food2: "soup"
      }
   })
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
})

/* Essentially, don't think of this in the scope of the APIs you use from online (weather, maps, movies). This will come in handy with finding users in the backends you will make for your applications. */

/*

Middleware
   NPM morgan: 


*/

app.listen(3000, function(){
   console.log(`Server is running on PORT: ${3000}`);
})