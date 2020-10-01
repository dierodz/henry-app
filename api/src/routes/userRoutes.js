const {
   createUser,
   getAllUsers,
   getUserById,
   deleteUserById,
   updateUser,
} = require("../controllers/userController");

const router = require("express").Router();

router
   .route("/")
   .post((req, res) => {
      createUser(req.body)
         .then((user) => res.status(201).json(user))
         .catch((err) => res.status(400).send(err));
   })
   .get((req, res) => {
      getAllUsers()
         .then((users) => res.json(users).status(200))
         .catch((err) => res.status(400).send(err));
   });

router
   .route("/:id")
   .get((req, res) => {
      const { id } = req.params;
      getUserById(id)
         .then((users) => res.json(users).status(200))
         .catch((err) => res.status(404).send(err));
   })
   .delete((req, res) => {
      deleteUserById()
         .then((users) => res.status(204).json(users))
         .catch((err) => res.status(400).send(err));
   })
   .put((req, res) => {
      const { id } = req.params;
      upDateUser(id, req.body)
         .then((users) => res.json(users).status(201))
         .catch((err) => res.status(400).send(err));
   });

module.exports = router;
