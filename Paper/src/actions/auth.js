import types from "../types/types";

export const login = (uid, user, token) => ({
   type: types.login,
   payload: { uid, user, token },
});

export const logout = () => ({ type: types.logout });

export const authSetError = (err) => ({
   type: types.authSetError,
   payload: err,
});

export const authRemoveError = () => ({ type: types.authRemoveError });
