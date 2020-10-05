const {
   getModules,
   createModule,
   deleteModule,
   editModule,
   getModulesById,
} = require("../controllers/modulesController");

const router = require("express").Router();

router
   .route("/")
   .get((req, res) => {
      getModules()
         .then((module) => res.json(module).status(200))
         .catch((err) => res.status(400).send(err));
   })
   .post((req, res) => {
      const { name, description } = req.body;
      createModule({ name, description })
         .then((user) => res.status(201).json(user))
         .catch((err) => res.status(400).send(err));
   });

router
   .route("/:id")
   .get((req, res) => {
      const { id } = req.params;
      getModulesById({ id })
         .then((module) => res.json(module).status(200))
         .catch((err) => res.status(404).send(err));
   })

   .put((req, res) => {
      const { id } = req.params;
      const { name, description } = req.body;
      editModule(id, name, description)
         .then((module) => res.json(module).status(201))
         .catch((err) => res.status(400).send(err));
   })
   .delete((req, res) => {
      const { id } = req.params;
      deleteModule(id)
         .then((module) => res.status(204).json(module))
         .catch((err) => res.status(400).send(err));
   });
module.exports = router;
