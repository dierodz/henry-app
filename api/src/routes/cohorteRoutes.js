const {
   createCohorte,
   deleteCohorteById,
   upDateCohorte,
   getAllCohortes,
   getEspecificCohorte
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
   .delete((req, res) => {
      const { id } = req.params;
      deleteCohorteById(id).then((user) => res.status(204).json(user))
         .catch((err) => res.status(404).json(err));
   })
   .put((req, res) => {
      const { id } = req.params;
      const { name } = req.body;
      upDateCohorte(id, name).then((user) => {
         res.status(201).json(user)
      })
         .catch((err) => res.status(404).json(err));
   })
   .get((req, res) => {
      const { id } = req.params;
      getEspecificCohorte(id)
         .then((user) => {
            delete user.createdAt
            delete user.updatedAt
            res.status(201).json(user)
         })
         .catch((err) => res.status(400).send(err));
   })


module.exports = router;
