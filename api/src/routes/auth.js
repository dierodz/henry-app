const router = require("express").Router(),
   jwt = require("jsonwebtoken"),
   passport = require("passport"),
   { getUserById } = require("../controllers/userController"),
   { googleLogin } = require("../controllers/mobileAuthController");

router.route("/me").get(async function (req, res) {
   if (req.user) {
      const user = await getUserById(req.user.uid);
      res.status(200).json(user);
   } else {
      res.sendStatus(401);
   }
});

router.route("/email").post(function (req, res, next) {
   passport.authenticate("local", function (err, user, info) {
      if (err) return next(err);
      if (!user) {
         return res.status(401).json({
            status: "error",
            code: "unauthorized",
            message: "usuario y/o contraseña inválida",
            info,
         });
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

router.route("/mobile/google").post(async (req, res) => {
   const { user } = req.body;
   const response = await googleLogin(user);
   if (!response) {
      return res.status(400).json({ message: "El usuario no está registrado" });
   }

   const token = jwt.sign({ uid: response.id }, process.env.SECRET);
   res.json({ user: response, token });
});

router.route("/google/callback").get(function (req, res, next) {
   passport.authorize("google", function (err, user) {
      if (err) return next(err);
      if (!user) {
         res.redirect(`${process.env.CALLBACK_URL_BASE}/auth/signin?error=401`);
      } else {
         const token = jwt.sign({ uid: user.id }, process.env.SECRET);
         res.redirect(
            `${process.env.CALLBACK_URL_BASE}/auth/signin?token=${token}`
         );
      }
   })(req, res, next);
});

router.route("/github").get(
   passport.authenticate("github", {
      scope: ["user", "user:email"],
   })
);

router.route("/github/callback").get(function (req, res, next) {
   passport.authorize("github", function (err, user) {
      if (err) return next(err);
      if (!user) {
         res.redirect(`${process.env.CALLBACK_URL_BASE}/auth/signin?error=401`);
      } else {
         const token = jwt.sign({ uid: user.id }, process.env.SECRET);
         res.redirect(
            `${process.env.CALLBACK_URL_BASE}/auth/signin?token=${token}`
         );
      }
   })(req, res, next);
});

module.exports = router;
