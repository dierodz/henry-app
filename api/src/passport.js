const {
   getUserByGoogleID,
   updateUser,
   getUserByGithubID,
   getUserById,
   _internalGetUserByEmail,
} = require("./controllers/userController");

const { User } = require("./db");

const jwt = require("jsonwebtoken"),
   passport = require("passport"),
   splitName = require("split-human-name"),
   LocalStrategy = require("passport-local").Strategy,
   BearerStrategy = require("passport-http-bearer").Strategy,
   GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
   GitHubStrategy = require("passport-github2").Strategy;

const SECRET = process.env.SECRET,
   GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET,
   GITHUB_APP_ID = process.env.GITHUB_APP_ID,
   GITHUB_APP_SECRET = process.env.GITHUB_APP_SECRET;

passport.use(
   new LocalStrategy(
      { usernameField: "username", passwordField: "password", session: false },
      async (username, password, done) => {
         const user = await _internalGetUserByEmail(username);
         if (!user)
            return done(null, false, {
               message: "Username or password is incorrect",
            });
         if (!user.compare(password))
            return done(null, false, {
               message: "Username or password is incorrect",
            });

         const sendUser = await getUserById(user.id);

         return done(null, sendUser);
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
      async (_token, _tokenSecret, profile, done) => {
         let user = await User.findOne({ where: { googleId: profile.id } });

         if (!user) {
            user = await _internalGetUserByEmail(profile.emails[0].value);

            if (!user) {
               return done(null, false);
            } else {
               await updateUser(user.id, {
                  givenName: profile.name.givenName,
                  familyName: profile.name.familyName,
                  nickName: profile.emails[0].value.split("@")[0],
                  googleId: profile.id,
                  photoUrl: profile.photos[0].value,
               });
            }
         }

         user = await getUserByGoogleID(profile.id);
         return done(null, user);
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
         let user = await User.findOne({ where: { githubId: profile.id } });
         if (!user) {
            user = await _internalGetUserByEmail(profile._json.email);

            if (!user) {
               return done(null, false);
            } else {
               const { givenName, familyName } = splitName(profile._json.name);
               await updateUser(user.id, {
                  givenName,
                  familyName,
                  nickName: profile._json.email,
                  githubId: profile.id,
                  photoUrl: profile._json.avatar_url,
               });
            }
         }

         user = await getUserByGithubID(profile.id);
         return done(null, user);
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
