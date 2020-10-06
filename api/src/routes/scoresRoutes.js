const { createScores, getScores, getScoreById, updateScore, deleteScore } = require("../controllers/scoresController")

const router = require('express').Router();

//~~~~~~~~~obtener y crear un score respectivamente~~~~~~~~~~~~\\

router
      .route('/')
      .get((req, res) => {
      getScores()
        .then( score => res.status(201).json(score))
        .catch(err => res.status(400).json({err}))

      })
      .post( (req, res) => {
      const { score } = req.body;
      createScores(score)
        .then( score => res.status(201).json(score))
        .catch(err => res.status(400).json({err}))
      })



//~~~~~~~~~~~~~~Obtener, actulizar y elimiar score respectivamente~~~~~~~~~~\\ 
router
      .route('/:id')
      .get( (req, res) => {
      const { id } = req.params;
      getScoreById(id)
      .then( score => res.status(201).json(score))
      .catch(err => res.status(400).json({err}))
      })
      .put( (req, res) => {
            const { id } = req.params;
            const { score } = req.body;

            updateScore(id, score)
              .then( score => res.status(201).json(score))
              .catch(err => res.status(400).json({err}))

      })
      .delete( (req, res) => {
            const { id } = req.params;

            deleteScore(id)
              .then( score => res.status(201).json(score))
              .catch(err => res.status(400).json({err}))


      })

module.exports = router;