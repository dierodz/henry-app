const router = require("express").Router(),
  auth = require('./auth');

router.use('/auth', auth);

module.exports = router;
