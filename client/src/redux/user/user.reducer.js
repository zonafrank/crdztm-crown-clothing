import userActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return { ...state, currentUser: action.payload, errorMessage: null };
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
      return { ...state, errorMessage: action.payload };
    case userActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, errorMessage: null}
    default:
      return state;
  }
}

export default userReducer;
