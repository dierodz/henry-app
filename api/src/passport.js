const jwt = require("jsonwebtoken"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  BearerStrategy = require("passport-http-bearer").Strategy,
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
  GitHubStrategy = require('passport-github').Strategy;

const SECRET = process.env.AUTH_SECRET || "secret",
  GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_APP_ID = process.env.GITHUB_APP_ID,
  GITHUB_APP_SECRET = process.env.GITHUB_APP_SECRET;

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password", session: false },
    async (username, password, done) => {
      const user = { id: 1, email: 'test@test.com', compare: (password) => true }
      // const user = await getOneByEmail(username);
      if (!user)
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      if (!user.compare(password))
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      const { id, email } = user;
      return done(null, {
        id,
        email,
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API}/auth/google/callback`,
      session: false,
    },
    async (token, tokenSecret, profile, done) => {
      const user = { id: 1, email: 'test@test.com', compare: (password) => true }
      // let user = await getOneByGoogleId(profile.id);
      if (!user)
        user = await createOne(
          profile.displayName,
          profile.emails[0].value,
          null,
          "GUEST",
          profile.id,
          null
        );
      const { id, email } = user;
      return done(null, { id, email });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_APP_ID,
      clientSecret: GITHUB_APP_SECRET,
      callbackURL: `${process.env.API}/auth/github/callback`,
      session: false,
    },
    async (token, tokenSecret, profile, done) => {
      const user = { id: 1, email: 'test@test.com', compare: (password) => true }
      // let user = await getOneByGoogleId(profile.id);
      if (!user)
        user = await createOne(
          profile.displayName,
          profile.emails[0].value,
          null,
          "GUEST",
          profile.id,
          null
        );
      const { id, email } = user;
      return done(null, { id, email });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, SECRET, function (err, user) {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;