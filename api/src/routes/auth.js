const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  passport = require("passport");

router.route('/email').post(function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", code: "unauthorized", message: "usuario y/o contraseña inválida", info });
    } else {
      return res.json({
        user,
        token: jwt.sign({ uid: user.id }, process.env.SECRET),
      });
    }
  })(req, res, next);
});

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.route("/google/callback").get(function (req, res, next) {
  passport.authorize("google", function (err, user) {
    if (err) return next(err);
    if (!user) {
      res.redirect(`${process.env.CALLBACK_URL_BASE}/sign-in?error=401`);
    } else {
      const token = jwt.sign({ uid: user.id }, process.env.SECRET);
      res.redirect(`${process.env.CALLBACK_URL_BASE}/sign-in?token=${token}`);
    }
  })(req, res, next);
});

router.route("/github").get(
  passport.authenticate("github", {
    scope: ["profile", "email"],
  })
);

router.route("/github/callback").get(function (req, res, next) {
  passport.authorize("github", function (err, user) {
    if (err) return next(err);
    if (!user) {
      res.redirect(`${process.env.CALLBACK_URL_BASE}/sign-in?error=401`);
    } else {
      const token = jwt.sign({ uid: user.id }, process.env.SECRET);
      res.redirect(`${process.env.CALLBACK_URL_BASE}/sign-in?token=${token}`);
    }
  })(req, res, next);
});

module.exports = router;