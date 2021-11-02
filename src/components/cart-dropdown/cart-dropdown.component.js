import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";



function CartDropdown({ cartItems, history, dispatch }) {
  function handleGoToCheckout() {
    history.push("/checkout");
    dispatch(toggleCartHidden())
  }

  return (
    <div className="cart-dropdown">
      {cartItems.length ? (
        <>
        <div className="cart-items">
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))}
        </div>
        <CustomButton onClick={handleGoToCheckout}>GO TO CHECKOUT</CustomButton>
        </>
      ) : (
        <span className="empty-message">Your cart is empty.</span>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
