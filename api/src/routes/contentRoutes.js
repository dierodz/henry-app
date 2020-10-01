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
         .catch((err) => res.status(400).send(err));
   })
   .get((req, res) => {
    getAllTopics()
         .then((topics) => res.json(topics))
         .catch((err) => res.status(400).send(err));
   });

   router
   .route("/:id")
   .delete((req, res) => {
    deleteTopic()
       .then((topic) => res.status(204).json(topic))
       .catch((err) => res.status(400).send(err));
 })
 .put((req, res) => {
    const { id } = req.params;
    updateTopic(id, req.body)
       .then((topic) => res.json(topic))
       .catch((err) => res.status(400).send(err));
 });

 module.exports = router;