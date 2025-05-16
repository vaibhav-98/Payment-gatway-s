import express from 'express';
import { payWithRazorpay,  } from '../controllers/paymentController.js';

const router = express.Router();

//router.post('/stripe', payWithStripe);
router.post('/razorpay', payWithRazorpay);
//router.post('/paypal', payWithPaypal);

export default router;