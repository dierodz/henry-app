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
         .then((pairGroup) => res.json(pairGroup).status(200))
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
         .then((pairGroup) => res.json(pairGroup).status(200))
         .catch((err) => res.status(404).send(err));
   })
   
   .put((req, res) => {
      const { id } = req.params;
      const{name}= req.body
      editPairGroup(id, name)
         .then((pairGroup) => res.json(pairGroup).status(201))
         .catch((err) => res.status(400).send(err));
   })
   .delete((req, res) => {
      const { id } = req.params;
      deletePairGroup(id)
         .then((pairGroup) => res.status(204).json(pairGroup))
         .catch((err) => res.status(400).send(err));
   });

   
module.exports =router;
