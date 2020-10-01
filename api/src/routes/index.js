const router = require("express").Router();
const auth = require("./auth");
const userRoutes = require("./userRoutes");
const checkPointsRoutes = require("./checkPointRoutes");

router.use("/auth", auth);
router.use("/users", userRoutes);
router.use("/chekpoints", checkPointsRoutes);

module.exports = router;
