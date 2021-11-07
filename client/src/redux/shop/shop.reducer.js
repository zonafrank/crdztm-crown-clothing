import shopActionTypes from "./shop.types";

const initialState = {
  collections: null,
  isFetching: false,
  errorMessage: null
}

function shopReducer(state = initialState, action) {
  switch (action.type) {
    case shopActionTypes.FETCH_COLLECTIONS_START:
      return {...state, isFetching: true}
    case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {...state, collections: action.payload, isFetching: false}
    case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {...state, isFetching: false, errorMessage: action.payload}
    default:
      return state
  }
}

export default shopReducer