const express = require("express");

const app = express();

//making a GET request
app.get('/', function(req, res){
   res.send('Hello Class')
})

app.listen(3000, function(){
   console.log(`Server is running on PORT: ${3000}`);
})