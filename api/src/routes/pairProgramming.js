const {
   getPairGroups,
   createPairGroup,
   deletePairGroup,
   editPairGroup,
   getpairGroupsById
} = require("../controllers/pairProgController");

const router = require("express").Router();


router
   .route("/")
   .get((req, res) => {
      getPairGroups()
         .then((users) => res.json(users).status(200))
         .catch((err) => res.status(400).send(err));
   })
   .post((req, res) => {

      createPairGroup(req.body)
         .then((user) => res.status(201).json(user))
         .catch((err) =>res.status(400).send(err));
   })

   router
   .route("/:id")
   .get((req, res) => {
      const { id } = req.params;
      getpairGroupsById(id)
         .then((users) => res.json(users).status(200))
         .catch((err) => res.status(404).send(err));
   })
   
   .put((req, res) => {
      const { id } = req.params;
      const{name}= req.body
      editPairGroup(id, name)
         .then((users) => res.json(users).status(201))
         .catch((err) => res.status(400).send(err));
   })
   .delete((req, res) => {
      const { id } = req.params;
      deletePairGroup(id)
         .then((users) => res.status(204).json(users))
         .catch((err) => res.status(400).send(err));
   });

   
module.exports =router;
