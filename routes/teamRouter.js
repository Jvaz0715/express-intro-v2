const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;

let teamArray = [
   {
      id: uuidv4(),
      name: "Lakers",
   },
   {
      id: uuidv4(),
      name: "Knicks",
   },
   {
      id: uuidv4(),
      name: "Nets",
   }
];

// router.get('/', function(req, res){
//    res.json({
//       data: teamArray,
//    })
// });

// make the above dynamic to show each team's site if a query is placed post '/'

router.get('/', function(req, res){
   //this is checking for if there is a ?name={name of a team} in the url
   if(req.query.name) {
      // declare an empty foundteam variable
      let foundTeam;
      // loop through the teamArray and if a team name matches the one in the url request, foundTeam will equal the team data
      teamArray.forEach((team) => {
         if (team.name === req.query.name) {
            foundTeam = team;
         }
      });
      // if no team matches the team name, inform the user that team is not found
      if (!foundTeam) {
         res.json({ message: "team not found!" })
      } else {
         // if a team does match, return that team's data
         res.json({ foundTeam: foundTeam });
      }
   } else {
      // if no team query is specified, we return the whole team array
      res.json({
         data: teamArray,
      })
   }
});

router.get("/get-team-by-id/:id", function(req, res){
   // used when we were hardcoding a number into the param
   // const id = Number(req.params.id);

   // uuidv4 version
   const id = req.params.id;
   let foundTeam;
   teamArray.forEach((team) => {
      if (team.id === id) {
         foundTeam = team;
      }
   });

   if (!foundTeam){
      res.json({ message: "the team id does not exist "})
   } else {
      res.json({foundTeam})
   }
})

router.get("/get-team-by-name/:name", function(req, res){
   const name = req.params.name;

   let foundTeam;

   teamArray.forEach((team) => {
      if(team.name === name) {
         foundTeam = team;
      }
   })

   if(!foundTeam){
      res.json({ message: "that team name does not exist"})
   } else {
      res.json({foundTeam})
   }
});

// adding a team
//uuid (npm i uuid) will add unique id to your API objects!

router.post("/create-team", function(req, res){
   let notFound = true;

   teamArray.forEach((team) => {
      if(team.name === req.body.name){
         notFound = false;
      }
   });

   if(notFound === false) {
      res.json({message: "that team already exists"})
   } else {
      let newTeamObj = {
         id: uuidv4(),
         name: req.body.name,
      }

      teamArray.push(newTeamObj);

      res.json({ teamArray })
   }

});

//updating a team
// if you don't want to update by name to avoid exposing name consider using ID
router.put("/update-team/:name", function(req, res) {
   let canUpdate = false;
   let foundTeam;

   teamArray.forEach((team) => {
      if (team.name === req.params.name) {
         canUpdate = true;
         foundTeam = team;
      }
   })

   if(canUpdate) {
      // the req.body.updatedName will be coming from the BODY of the PUT request in postman
      // foundTeam.name = req.body.updatedName;
      // res.json({ foundTeam })

      // NOTE: Reflect on the differences between .indexOf() and .findIndex()
      //the below will findIndex if the updatedName already exists, any return other than a -1 will mean that the team does exist
      // in order to update, we want isFound === -1
      let isFound = teamArray.findIndex((team) => team.name === req.body.updatedName);

      if (isFound > -1) {
         res.json({ message: "cannot update to a team that already exists"})
      } else {
         foundTeam.name = req.body.updatedName;
         res.json({ message: "team successfully updated" })
      }

   } else {
      res.json({ message: "Team not found! Cannot update!"})
   }
});

module.exports = router;