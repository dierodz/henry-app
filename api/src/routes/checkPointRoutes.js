const router = require("express").Router();

const {
   getAllCheck,
   createCheck,
   getOneCheck,
   editCheck,
   deleteCheck,
} = require("../controllers/checkPointController");

router
   .route("/")
   .get((req, res) => {
      getAllCheck()
         .then((checkpoints) => res.json(checkpoints))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   })
   .post((req, res) => {
      const { name } = req.body;

      createCheck(name)
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

      getOneCheck({ id })
         .then((checkpoint) => res.json(checkpoint))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   })
   .put((req, res) => {
      const { id } = req.params;

      editCheck(id, req.body)
         .then((checkpoint) => res.json(checkpoint))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   })
   .delete((req, res) => {
      const { id } = req.params;
      deleteCheck({ id })
         .then((checkpoint) => res.json(checkpoint))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }

            res.status(400).json(err);
         });
   });

module.exports = router;
