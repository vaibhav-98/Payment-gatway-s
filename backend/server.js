import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import paymentRoutes from './routes/paymentRoutes.js';


dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/payments', paymentRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => console.log('Server running at port', process.env.PORT));
}).catch(err => console.log(err));
