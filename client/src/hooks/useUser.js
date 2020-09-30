import { login, logout } from "actions/auth";
import Axios from "axios";
import { useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "react-use";

function useInitialize(localUser) {
   useEffect(() => {
      Axios.defaults.baseURL = process.env.REACT_APP_API;

      if (localUser) {
         if (localUser.token) {
            Axios.defaults.headers.common[
               "Authorization"
            ] = `Bearer ${localUser.token}`;
         } else {
            Axios.defaults.headers.common["Authorization"] = ``;
         }
      } else {
         Axios.defaults.headers.common["Authorization"] = ``;
      }
   }, [localUser]);
}

export default function useUser() {
   const [localUser, setLocalUser, removeLocalUser] = useLocalStorage(
      "auth",
      null
   );

   const user = useMemo(() => {
      if (localUser) return localUser.user;
      return undefined;
   }, [localUser]);

   const signOut = useCallback(() => {
      return async (dispatch) => {
         dispatch(logout());
         removeLocalUser();
      };
   }, [removeLocalUser]);

   async function loginWithEmail(username, password) {
      return async (dispatch) => {
         try {
            const { data } = await Axios.post("/auth/email", {
               username,
               password,
            });

            if (data) {
               const { user, token } = data;

               setLocalUser({ token, user });
               dispatch(login(user.id, user, token));
            }
         } catch ({ data }) {
            console.log(data);
         }
      };
   }

   async function signInWithToken(token) {
      token = token.split("#")[0];

      return async (dispatch) => {
         token = token.split("#")[0];
         try {
            const { data } = await Axios.get("/auth/me", {
               headers: { Authorization: `Bearer ${token}` },
            });
            if (data) {
               const { user, token } = data;
               setLocalUser({ token, user });
               dispatch(login(user.id, user, token));
            }
         } catch ({ data }) {
            console.log(data);
         }
      };
   }

   async function signInWithGoogle() {
      return async (dispatch) => {
         if (window) {
            window.location = `${process.env.REACT_APP_API}/auth/google`;
         }
      };
   }

   async function signInWithGithub() {
      return async (dispatch) => {
         if (window) {
            window.location = `${process.env.REACT_APP_API}/auth/github`;
         }
      };
   }

   return {
      initialize: useInitialize,
      user,
      loginWithEmail,
      signInWithGoogle,
      signInWithGithub,
      signInWithToken,
      signOut,
   };
}
