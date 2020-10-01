import Axios from "axios";
import { useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "react-use";

function useInitialize(localUser) {
  useEffect(() => {
    Axios.defaults.baseURL = process.env.REACT_APP_API

    if (localUser) {
      if (localUser.token) {
        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localUser.token}`;
      } else {
        Axios.defaults.headers.common[
          "Authorization"
        ] = ``;
      }
    } else {
      Axios.defaults.headers.common[
        "Authorization"
      ] = ``;
    }
  }, [localUser]);
}

export default function useUser() {
  const [localUser, setLocalUser, removeLocalUser] = useLocalStorage('auth', null)

  const user = useMemo(() => { if (localUser) return localUser.user; return undefined }, [localUser])

  const signOut = useCallback(
    () => {
      removeLocalUser()
    },
    [removeLocalUser],
  )

  async function signInWithEmail(username, password) {
    try {
      const result = await Axios.post('/auth/email', { username, password });
      if (result.data) setLocalUser(result.data);
    } catch {

    }
  }

  async function signInWithToken(token) {
    token = token.split("#")[0];
    try {
      Axios.defaults.baseURL = process.env.REACT_APP_API
      const result = await Axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (result.data) {
        setLocalUser({ token, user: result.data })
      }
    } catch {

    }
  }

  async function signInWithGoogle() {
    if (window) {
      window.location = `${process.env.REACT_APP_API}/auth/google`
    }
  }

  async function signInWithGithub() {
    if (window) {
      window.location = `${process.env.REACT_APP_API}/auth/github`
    }
  }

  return {
    initialize: useInitialize,
    user,
    signInWithEmail,
    signInWithGoogle,
    signInWithGithub,
    signInWithToken,
    signOut
  }
}