import { all, call } from "redux-saga/effects"
import { cartSagas } from "./cart/cart.saga"
import { shopSagas } from "./shop/shop.sagas"
import { userSagas } from "./user/user.saga"

export default function* rootSaga() {
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas)
  ])
}