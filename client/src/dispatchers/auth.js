import Axios from "axios";
import { login, logout } from "actions/auth";

export const signOut = () => {
   return async (dispatch) => {
      dispatch(logout());
      localStorage.removeItem("auth");
   };
};

export const useInitialize = (localUser) => {
   // Axios.defaults.baseURL = process.env.REACT_APP_API;

   if (localUser && localUser.token) {
      Axios.defaults.headers.common[
         "Authorization"
      ] = `Bearer ${localUser.token}`;
   } else {
      Axios.defaults.headers.common["Authorization"] = ``;
   }
};

export const signInWithEmail = (username, password) => {
   return async (dispatch) => {
      try {
         const { data } = await Axios.post(
            `${process.env.REACT_APP_API}/auth/email`,
            {
               username,
               password,
            }
         );

         if (data) {
            const { user, token } = data;

            localStorage.setItem("token", JSON.stringify(token));
            dispatch(login(user.id, user, token));
         }
      } catch ({ data }) {
         console.log(data);
      }
   };
};

export const signInWithToken = (token) => {
   return async (dispatch) => {
      try {
         const { data } = await Axios.get(
            `${process.env.REACT_APP_API}/auth/me`,
            {
               headers: { Authorization: `Bearer ${token}` },
            }
         );
         if (data) {
            localStorage.setItem("token", JSON.stringify(token));
            dispatch(login(data.id, data, token));
         }
      } catch ({ data }) {
         console.log(data);
      }
   };
};

export const signInWithGoogle = () => {
   if (window) {
      window.location = `${process.env.REACT_APP_API}/auth/google`;
   }
};

export const signInWithGithub = () => {
   if (window) {
      window.location = `${process.env.REACT_APP_API}/auth/github`;
   }
};
