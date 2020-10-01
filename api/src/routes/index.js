const router = require("express").Router(),
      auth = require('./auth'),
      userRoutes = require('./userRoutes'),

      modulesRoutes = require('./modulesRoutes');

router.use('/auth', auth);
router.use('/users', userRoutes);
router.use('/modules', modulesRoutes);



module.exports = router;
