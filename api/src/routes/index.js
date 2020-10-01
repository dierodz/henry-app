const router = require("express").Router(),
      auth = require('./auth'),
      userRoutes = require('./userRoutes'),
      ratingsRoutes = require('./ratingsRoutes');

router.use('/auth', auth);
router.use('/users', userRoutes);
router.use('/ratings', ratingsRoutes);
module.exports = router;
