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
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default userReducer;
