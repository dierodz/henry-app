const {
   createContent,
   updateTopic,
   deleteTopic,
   getAllTopics,
} = require("../controllers/contentController");

const router = require("express").Router();

router
   .route("/")
   .post((req, res) => {
      createContent(req.body)
         .then((topic) => res.status(201).json(topic))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }
            res.status(400).json(err);
         });
   })
   .get((req, res) => {
      getAllTopics()
         .then((topics) => res.json(topics))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }
            res.status(400).json(err);
         });
   });

router
   .route("/:id")
   .delete((req, res) => {
      const { id } =req.params;   
      deleteTopic(id)
         .then((topic) => res.status(204).json(topic))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }
            res.status(400).json(err);
         });
   })
   .put((req, res) => {
      const { id } = req.params;
      updateTopic(id, req.body)
         .then((topic) => res.json(topic))
         .catch((err) => {
            if (err.error) {
               return res.status(err.error.code).json(err);
            }
            res.status(400).json(err);
         });
   });

module.exports = router;
