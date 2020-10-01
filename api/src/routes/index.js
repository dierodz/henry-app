const router = require("express").Router(),
      auth = require('./auth'),
      userRoutes = require('./userRoutes'),
      scoresRoutes = require('./scoresRoutes');

router.use('/auth', auth);
router.use('/users', userRoutes);
router.use('/scores', scoresRoutes);
module.exports = router;
