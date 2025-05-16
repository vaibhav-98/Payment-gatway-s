import dotenv from 'dotenv';
dotenv.config();

import Razorpay from 'razorpay';
// import Stripe from 'stripe';
// import paypal from 'paypal-rest-sdk';

//console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
//console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// paypal.configure({
//   mode: 'sandbox',
//   client_id: process.env.PAYPAL_CLIENT_ID,
//   client_secret: process.env.PAYPAL_CLIENT_SECRET
// });

// export const payWithStripe = async (req, res) => {
//   try {
//     const { amount, token } = req.body;
//     const charge = await stripe.charges.create({
//       amount: amount * 100,
//       currency: 'inr',
//       source: token,
//       description: 'Stripe payment',
//     });
//     res.status(200).json(charge);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const payWithRazorpay = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: 'order_rcptid_11'
    });
    res.status(200).json({ 
    id: order.id, 
    amount: order.amount, 
    currency: order.currency,
   key: process.env.RAZORPAY_KEY_ID // <-- send this to frontend
});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const payWithPaypal = (req, res) => {
//   const { amount } = req.body;
//   const create_payment_json = {
//     intent: 'sale',
//     payer: { payment_method: 'paypal' },
//     redirect_urls: {
//       return_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel'
//     },
//     transactions: [{
//       amount: { currency: 'USD', total: amount.toString() },
//       description: 'Paypal Payment'
//     }]
//   };

//   paypal.payment.create(create_payment_json, (error, payment) => {
//     if (error) {
//       res.status(500).json({ error: error.response });
//     } else {
//       const redirectUrl = payment.links.find(link => link.rel === 'approval_url').href;
//       res.status(200).json({ url: redirectUrl });
//     }
//   });
// };
