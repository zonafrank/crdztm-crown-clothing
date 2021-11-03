import React from "react";
import StripeCheckout from "react-stripe-checkout";

function StripeCheckoutButton({ price }) {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JreYRAXb01R7AiLJEMTqEXTFsAsfYyMDatLiFwmoFaqA8iIqlQ2pVksvi6IA381BDlPrhXG1SCbr3zDuUglb4kf00tEKJ0rDT";

  const onToken = token => {
    console.log(token);
    alert("Payment successful!")
  }
  
  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="/images/crown.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}

export default StripeCheckoutButton;
