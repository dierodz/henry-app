const router = require("express").Router(),
      auth = require('./auth'),
      userRoutes = require('./userRoutes');

router.use('/auth', auth);
router.use('/users', userRoutes);

module.exports = router;
