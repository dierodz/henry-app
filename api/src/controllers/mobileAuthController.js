const { User } = require("../db");
const { _internalGetUserByEmail, updateUser } = require("./userController");

const googleLogin = async (googleUser) => {
   const { email, id } = googleUser;

   let user = await User.findOne({ where: { googleId: id } });

   if (!user) {
      user = await _internalGetUserByEmail(email);

      if (!user) {
         return null;
      }
   }

   return updateUser(id, { ...user });
};

module.exports = {
   googleLogin,
};
