import { login } from "actions/auth";
import Axios from "axios";

Axios.defaults.baseURL = process.env.REACT_APP_API;

const initialize = () => {
   const userToken = localStorage.getItem("userToken");
   if (userToken) {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
   } else {
      Axios.defaults.headers.common["Authorization"] = ``;
   }
};

export const startLoginWithEmailAndPassword = (username, password) => {
   initialize();

   return async (dispatch) => {
      try {
         const { data } = await Axios.post("/auth/email", {
            username,
            password,
         });

         if (data) {
            const { user, token } = data;
            localStorage.setItem("userToken", token);
            dispatch(login(user.id, user, token));
         }
      } catch ({ data }) {
         console.log(data);
      }
   };
};

export const startSignInWithToken = (token) => {
   initialize();

   return async (dispatch) => {
      token = token.split("#")[0];
      try {
         const { data } = await Axios.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
         });
         if (data) {
            const { user, token } = data;
            localStorage.setItem("userToken", token);
            dispatch(login(user.id, user, token));
         }
      } catch ({ data }) {
         console.log(data);
      }
   };
};

export const startSignInWithGoogle = () => {
   initialize();

   if (window) {
      window.location = `${process.env.REACT_APP_API}/auth/google`;
   }
};

export const startSsignInWithGithub = () => {
   initialize();

   if (window) {
      window.location = `${process.env.REACT_APP_API}/auth/github`;
   }
};
