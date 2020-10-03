import types from "types/types";

const initialState = {
   authenticated: false,
   uid: null,
   user: null,
   token: null,
   msgError: null,
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.login:
         return {
            authenticated: true,
            user: action.payload.user,
            uid: action.payload.uid,
            token: action.payload.token,
            msgError: null,
         };

      case types.authSetError:
         return {
            ...state,
            msgError: action.payload,
         };

      case types.authRemoveError:
         return {
            ...state,
            msgError: null,
         };

      case types.logout:
         return initialState;

      default:
         return state;
   }
};

export default authReducer;
