import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { authSetError, login, logout } from "../actions/auth";

import { REACT_APP_API_REMOTE } from "@env";
import { finishLoading, startLoading } from "../actions/ui";
import GoogleSignIn from "expo-google-sign-in";

// export const googleInitGoogle = () => {
//   return async (dispatch) => {
//     await
//   }
// }

export const googleInitAsync = async () => {
  await GoogleSignIn.initAsync({
    clientId:
      "80624130355-2ejfuk9es2ncdal1enjuspmuscufhq51.apps.googleusercontent.com",
  });
  _syncUserWithStateAsync();
};

export const googleSignInAsync = () => {
  return async (dispatch) => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user, auth } = await GoogleSignIn.signInAsync();
      // if (type === "success") {
      //   _syncUserWithStateAsync();
      //   console.log(user);
      // }
      console.log(type, user, auth);
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };
};

export const _syncUserWithStateAsync = async () => {
  const user = await GoogleSignIn.signInSilentlyAsync();
};

export const signOutAsync = async () => {
  await GoogleSignIn.signOutAsync();
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    dispatch(logout());
    await AsyncStorage.removeItem("token");
    dispatch(finishLoading());
  };
};

export const initialize = (localUser) => {
  Axios.defaults.baseURL = REACT_APP_API_REMOTE;

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
    dispatch(startLoading());
    try {
      const { data } = await Axios.post(`${REACT_APP_API_REMOTE}/auth/email`, {
        username,
        password,
      });

      if (data) {
        const { user, token } = data;
        await AsyncStorage.setItem("token", token);
        dispatch(login(user.id, user, token));
        dispatch(finishLoading());
      }
    } catch ({ response }) {
      dispatch(signOut());
      dispatch(authSetError(response.data.message));
      dispatch(finishLoading());
    }
  };
};

export const signInWithToken = (token) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await Axios.get(`${REACT_APP_API_REMOTE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        await AsyncStorage.setItem("token", token);
        dispatch(login(data.id, data, token));
        dispatch(finishLoading());
      }
    } catch ({ response }) {
      dispatch(signOut());
      dispatch(authSetError(response.data.message));
      dispatch(finishLoading());
    }
  };
};

export const signInWithGoogle = () => {
  if (window) {
    window.location = `${REACT_APP_API_REMOTE}/auth/google`;
  }
};

export const signInWithGithub = () => {
  if (window) {
    window.location = `${REACT_APP_API_REMOTE}/auth/github`;
  }
};
