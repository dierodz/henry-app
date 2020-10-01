const { createRatings } = require("../controllers/ratingsController")

const router = require('express').Router();

router
      .route('/')
      .post( (req, res) => {
      	const { score } = req.body;
      	createRatings(score)
      	  .then( score => res.status(201).json(score))
      	  .catch(err => res.status(400).json({err}))
      })

module.exports = router;