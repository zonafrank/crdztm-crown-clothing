import { userActionTypes } from "./user.types"

export function setCurrentUser(user) {
  return {
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
  }
}