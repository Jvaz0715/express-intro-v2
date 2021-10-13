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
   
   if(req.query.name) {
      let foundTeam;
      teamArray.forEach((team) => {
         if (team.name === req.query.name) {
            foundTeam = team;
         }
      });

      if (!foundTeam) {
         res.json({ message: "team not found!" })
      } else {
         res.json({ foundTeam: foundTeam });
      }

      
   } else {
      res.json({
         data: teamArray,
      })
   }
})

module.exports = router;