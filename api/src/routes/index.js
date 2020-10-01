const router = require("express").Router(),
      auth = require('./auth'),
      userRoutes = require('./userRoutes'),
      contentRoutes = require('./contentRoutes');

router.use('/auth', auth);
router.use('/users', userRoutes);
router.use('/contents', contentRoutes);

module.exports = router;
