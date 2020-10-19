import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { authSetError, login, logout } from "../actions/auth";

export const REACT_APP_API = "http://localhost:3001";

export const signOut = () => {
  return async (dispatch) => {
    dispatch(logout());
    await AsyncStorage.removeItem("token");
  };
};

export const initialize = (localUser) => {
  Axios.defaults.baseURL = REACT_APP_API;

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
      const { data } = await Axios.post(`${REACT_APP_API}/auth/email`, {
        username,
        password,
      });

      if (data) {
        const { user, token } = data;

        await AsyncStorage.setItem("token", JSON.stringify(token));
        dispatch(login(user.id, user, token));
      }
    } catch ({ response }) {
      dispatch(logout());
      dispatch(authSetError(response.data.message));
    }
  };
};

export const signInWithToken = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`${REACT_APP_API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        await AsyncStorage.setItem("token", JSON.stringify(token));
        dispatch(login(data.id, data, token));
      }
    } catch ({ response }) {
      dispatch(logout());
      dispatch(authSetError(response.data.message));
    }
  };
};

export const signInWithGoogle = () => {
  if (window) {
    window.location = `${REACT_APP_API}/auth/google`;
  }
};

export const signInWithGithub = () => {
  if (window) {
    window.location = `${REACT_APP_API}/auth/github`;
  }
};
