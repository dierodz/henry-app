const { User } = require("../db");
const { _internalGetUserByEmail, updateUser } = require("./userController");

const googleLogin = async (profile) => {
   const { email, id } = profile;

   let user = await User.findOne({ where: { googleId: id.toString() } });

   if (!user) {
      user = await _internalGetUserByEmail(email);

      if (!user) {
         return null;
      }
   }

   user = await updateUser(user.id, {
      givenName: profile.givenName,
      familyName: profile.familyName,
      googleId: profile.id.toString(),
      photoUrl: profile.photoUrl,
   });

   return user;
};

module.exports = {
   googleLogin,
};
