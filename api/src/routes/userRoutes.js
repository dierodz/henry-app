const {
   createUser,
   getAllUsers,
   getUserById,
   deleteUserById,
   updateUser,
   setRolesToUser,
} = require("../controllers/userController");

const router = require("express").Router();

router
   .route("/")
   .post((req, res) => {
      createUser(req.body)
         .then((users) => res.json(users))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   })
   .get((req, res) => {
      getAllUsers()
         .then((checkpoint) => res.json(checkpoint))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   });

router
   .route("/:id")
   .get((req, res) => {
      const { id } = req.params;
      getUserById(id)
         .then((users) => res.json(users).status(200))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }
            res.status(400).json(err);
         });
   })
   .delete((req, res) => {
      deleteUserById()
         .then((users) => res.status(204).json(users))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   })
   .put((req, res) => {
      const { id } = req.params;
      updateUser(id, req.body)
         .then((users) => res.json(users).status(201))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   });

router.route("/:id/roles/:rolName").post((req, res) => {
   const { id, rolName } = req.params;

  

   setRolesToUser(id, rolName)
      .then((checkpoint) => res.json(checkpoint))
      .catch((err) => {
         if (err.error) {
            return res.status(err.error.code).json(err);
         }
         res.status(400).json(err);
      });
});

module.exports = router;
