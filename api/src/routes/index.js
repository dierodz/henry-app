const router = require("express").Router(),
      auth = require('./auth'),
      cohort = require("./cohorteRoutes"),
      userRoutes = require('./userRoutes'),
      modulesRoutes = require('./modulesRoutes');

router.use('/auth', auth);
router.use('/cohortes', cohort);
router.use('/modules', modulesRoutes);
router.use('/users', userRoutes);

module.exports = router;
