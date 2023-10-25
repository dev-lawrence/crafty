import axios from 'axios';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import Order from './orderModel.js';

dotenv.config();

// Connect mongoose to database
const mongoURI = process.env.MONGODB_URI;

// paystack secret key
const secret = process.env.PAYSTACK_SECRET_KEY;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => console.log(err.message));

const app = express();

app.use(cors());

const jsonParserForProducts = express.json();

app.post(
  '/api/paystack/create-checkout-session',
  jsonParserForProducts,
  async function (req, res) {
    try {
      const { email, amount, products } = req.body;

      const formattedProducts = products.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        image: product.image,
      }));

      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email: email,
          amount: amount * 100,
          metadata: {
            products: formattedProducts,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${secret}`,
          },
        }
      );

      const authorizationUrl = response.data.data.authorization_url;

      res.json({ authorizationUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

app.post(
  '/api/paystack/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async function (req, res) {
    try {
      // Parse the request body as JSON
      const body = req.body.toString();
      const jsonData = JSON.parse(body);

      const hash = crypto
        .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
        .update(body, 'utf-8')
        .digest('hex');

      if (hash == req.headers['x-paystack-signature']) {
        const event = jsonData.event;

        // Handle different Paystack events based on the `event` field
        if (event === 'charge.success') {
          const newOrder = new Order({
            reference: jsonData.data.reference,
            product: jsonData.data.metadata.products,
            total: jsonData.data.requested_amount,
            payment_status: jsonData.data.gateway_response,
          });

          await newOrder.save();

          res.status(200).send('Success');
          console.log('Order saved to database');
        } else {
          // Handle other Paystack events if needed
          console.log('Received Paystack event:', event);
          res.status(200).send('Event not handled');
        }
      } else {
        // Invalid signature, ignore the webhook event
        console.log('Invalid Paystack signature');
        res.status(400).send('Invalid signature');
      }
    } catch (error) {
      console.error('Error processing Paystack webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

app.get('/api/paystack/orders', jsonParserForProducts, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
