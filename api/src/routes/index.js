const router = require("express").Router(),
    cohort = require("./cohorteRoutes");

router.use('/cohortes', cohort);

module.exports = router;
