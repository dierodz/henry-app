import types from "../types/types";
export function Capitalize(str){
   return str.charAt(0).toUpperCase() + str.slice(1)
}

export const login = (uid, user, token) =>{
  return ({
      type: types.login,
      payload: { uid, user, token },
   })

} ;

export const logout = () => ({ type: types.logout });

export const authSetError = (err) => ({
   type: types.authSetError,
   payload: err,
});

export const authRemoveError = () => ({ type: types.authRemoveError });
