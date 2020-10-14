const router = require("express").Router(),
  auth = require('./auth'),
  userRoutes = require('./userRoutes'),
  scoresRoutes = require('./scoresRoutes'),
  contentRoutes = require('./contentRoutes'),
  checkPointsRoutes = require("./checkPointRoutes"),
  cohortRoutes = require("./cohorteRoutes"),
  modulesRoutes = require('./modulesRoutes'),
  PairProgrammingRoutes = require('./pairProgramming'),
  roleRoutes = require('./routeRoles');
  lessonsRoutes = require('./vimeo')


router.use('/auth', auth);
router.use("/chekpoints", checkPointsRoutes);
router.use('/cohortes', cohortRoutes);
router.use('/modules', modulesRoutes);
router.use('/users', userRoutes);
router.use('/scores', scoresRoutes);
router.use('/pair', PairProgrammingRoutes);
router.use('/contents', contentRoutes);
router.use('/roles', roleRoutes);
router.use('/clasesGrabadas', lessonsRoutes);

module.exports = router;
