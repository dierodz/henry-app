const router = require("express").Router(),
    cohort = require("./cohorteRoutes");

router.use('/cohorte', cohort);

module.exports = router;
