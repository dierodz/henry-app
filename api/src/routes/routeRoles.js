
const { 
	getOneRole,
   getAllRoles,
   createRole,
   editRole,
   deleteRole
} = require('../controllers/roleController');


const router = require("express").Router();


router
   .route("/")
   .get((req, res) => {
      getAllRoles()
         .then((role) => res.json(role))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   })
   .post((req, res) => {
      const { name } = req.body;

      createRole(name)
         .then((role) => res.json(role))
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

      getOneRole(id)
         .then((role) => res.json(role))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   })
   .put((req, res) => {
      const { id } = req.params;

      editRole(id, req.body)
         .then((role) => res.json(role))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   })
   .delete((req, res) => {
      const { id } = req.params;
      deleteRole({ id })
         .then((role) => res.json(role))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   });

module.exports = router;
