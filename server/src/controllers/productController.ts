import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc Get all products
// @route GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};
