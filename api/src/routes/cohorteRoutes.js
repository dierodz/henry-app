const {
    createCohorte
 } = require("../controllers/cohorteController");
 
 const router = require("express").Router();
 
 router
   .route("/")
   .post((req, res) => {
      createCohorte(req.body)
         .then((user) => res.status(201).json(user))
         .catch((err) => res.status(400).send(err));
   })
   .get((req,res) =>{
       res.send("Hola")
   })


 module.exports = router;
