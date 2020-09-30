const { createUser, getAllUsers } = require("../controllers/userController");

const router = require("express").Router();

router
   .route("/")
   .post((req, res) => {
      const {
         giveName,
         familyName,
         nickName,
         email,
         googleId,
         githubId,
         photoUrl,
         password,
      } = req.body;
      createUser({
         giveName,
         familyName,
         nickName,
         email,
         googleId,
         githubId,
         photoUrl,
         password,
      })
         .then((user) => res.status(201).json(user))
         .catch((err) => res.status(400).send(err));
   })
   .get((req, res) => {
      getAllUsers()
         .then((users) => res.json(users))
         .catch((err) => res.status(400).send(err));
   });

// router
//    .route("/:id")
//    .delete((req, res) = {
//     const {
//         id
//       } = req.params;
//     }
module.exports = router;
