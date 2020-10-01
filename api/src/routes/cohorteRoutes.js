const {
    createCohorte,
    deleteCohorteById,
    upDateCohorte,
    getAllCohortes,
 } = require("../controllers/cohorteController");
 
 const router = require("express").Router();
 
 router
   .route("/")
   .post((req, res) => {
      createCohorte(req.body)
         .then((user) => res.status(201).json(user))
         .catch((err) => res.status(400).send(err));
   })
   .get((req, res) => {
      getAllCohortes()
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(400).send(err));
   })

router
   .route("/:id")
   .delete((req,res)=> {
    const {id} = req.params;
    deleteCohorteById(id).then((user) => res.status(204).json(user))
    .catch((err) => res.status(404).json(err));
 })
 .put((req,res)=> {
    const {id} = req.params;
    const {cohorteName, cohorteNumber} = req.body;
    upDateCohorte(id,cohorteName,cohorteNumber).then((user) => {
      console.log(user)
      res.status(201).json(user)
    })
    .catch((err) => res.status(404).json(err));
 })


 module.exports = router;
