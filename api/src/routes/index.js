const router = require("express").Router(),
      auth = require('./auth'),
      userRoutes = require('./userRoutes'),
      scoresRoutes = require('./scoresRoutes'),
      contentRoutes = require('./contentRoutes'),
      checkPointsRoutes = require("./checkPointRoutes"),
      cohortRoutes = require("./cohorteRoutes"),
      userRoutes = require('./userRoutes'),
      modulesRoutes = require('./modulesRoutes');

router.use('/auth', auth);
router.use("/chekpoints", checkPointsRoutes);
router.use('/cohortes', cohortRoutes);
router.use('/modules', modulesRoutes);
router.use('/users', userRoutes);
router.use('/scores', scoresRoutes);
router.use('/contents', contentRoutes);

module.exports = router;
