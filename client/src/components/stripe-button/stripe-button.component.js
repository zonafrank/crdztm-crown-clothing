import axios from "axios";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

function StripeCheckoutButton({ price }) {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JreYRAXb01R7AiLJEMTqEXTFsAsfYyMDatLiFwmoFaqA8iIqlQ2pVksvi6IA381BDlPrhXG1SCbr3zDuUglb4kf00tEKJ0rDT";

  const onToken = (token) => {
    console.log(token);
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log("Payment error", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure to use the provided credit card details."
        );
      });
  };

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
