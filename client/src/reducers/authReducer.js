import types from "types/types";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        user: action.payload.user,
        token: action.payload.token,
      };

    case types.logout:
      return {};

    default:
      return state;
  }
};

export default authReducer;
