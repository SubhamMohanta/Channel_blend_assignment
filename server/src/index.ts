import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/store';

// Configure CORS
app.use(cors({
  origin: ['https://product-web-app-nine.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Additional CORS Headers for Debugging
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://product-web-app-nine.vercel.app');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
