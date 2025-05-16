import React from 'react';
import axios from 'axios';

const Checkout = () => {
  const amount = 100;

//   const handleStripe = async () => {
//   const token = 'tok_visa';
//   await axios.post('http://localhost:5000/api/payments/stripe', { amount, token });
//   alert('Stripe Payment Successful');
// };

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const handleRazorpay = async () => {
  const res = await loadRazorpayScript();

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/payments/razorpay', { amount });
    const options = {
      key:  response.data.key,  // Use your actual key here or from env
      amount: response.data.amount,
      currency: 'INR',
      order_id: response.data.id,
      handler: function (paymentResult) {
        alert('Payment Successful');
        console.log(paymentResult);
      },
      prefill: {
        name: 'Your Name',
        email: 'email@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Some Address',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    alert('Payment failed: ' + error.message);
  }
};


//   const handlePaypal = async () => {
//     const res = await axios.post('http://localhost:5000/api/payments/paypal', { amount });
//     window.location.href = res.data.url;
//   };

  return (
    <div>
      <h2>Checkout</h2>
      {/* <button onClick={handleStripe}>Pay with Stripe</button> */}
      <button onClick={handleRazorpay}>Pay with Razorpay</button>
      {/* <button onClick={handlePaypal}>Pay with PayPal</button> */}
    </div>
  );
};

export default Checkout;