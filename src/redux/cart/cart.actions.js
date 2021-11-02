import cartActionTypes from "./cart.types";

export function toggleCartHidden() {
  console.log(cartActionTypes.TOGGLE_CART_HIDDEN)
  return { type: cartActionTypes.TOGGLE_CART_HIDDEN };
}

export function addItem(item) {
  return {type: cartActionTypes.ADD_ITEM, payload: item}
}