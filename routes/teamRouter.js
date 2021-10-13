const express = require("express");
const router = express.Router();

let teamArray = [
   {
      id: 1,
      name: "Lakers",
   },
   {
      id: 2,
      name: "Knicks",
   },
   {
      id: 3,
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
   const id = Number(req.params.id);
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

module.exports = router;