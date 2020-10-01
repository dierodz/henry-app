const {
   getModules,
   createModule,
   deleteModule,
   editModule,
   getModulesById
} = require("../controllers/modulesController");

const router = require("express").Router();


router
   .route("/")
   .get((req, res) => {
      getModules()
         .then((users) => res.json(users).status(200))
         .catch((err) => res.status(400).send(err));
   })
   .post((req, res) => {
      const {name,description} = req.body
      createModule({name,description})
         .then((user) => res.status(201).json(user))
         .catch((err) =>{console.log(err)} )
         // res.status(400).send(err));
   })

   router
   .route("/:id")
   .get((req, res) => {
      const { id } = req.params;
      getModulesById(id)
         .then((users) => res.json(users).status(200))
         .catch((err) => res.status(404).send(err));
   })
   
   .put((req, res) => {
      const { id } = req.params;
      editModule(id, req.body)
         .then((users) => res.json(users).status(201))
         .catch((err) => res.status(400).send(err));
   })
   .delete((req, res) => {
      const { id } = req.params;
      deleteModule(id)
         .then((users) => res.status(204).json(users))
         .catch((err) => res.status(400).send(err));
   });
module.exports =router;
