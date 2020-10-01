const router = require("express").Router(),
      auth = require('./auth'),
      userRoutes = require('./userRoutes'),
      contentRoutes = require('./contentRoutes'),
      checkPointsRoutes = require("./checkPointRoutes"),
      cohortRoutes = require("./cohorteRoutes"),
      userRoutes = require('./userRoutes'),
      modulesRoutes = require('./modulesRoutes'),
      PairProgrammingRoutes = require('./pairProgramming');

router.use('/auth', auth);
router.use("/chekpoints", checkPointsRoutes);
router.use('/cohortes', cohortRoutes);
router.use('/modules', modulesRoutes);
router.use('/users', userRoutes);
router.use('/pair', PairProgrammingRoutes);
router.use('/contents', contentRoutes);

module.exports = router;
