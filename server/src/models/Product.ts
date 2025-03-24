import mongoose, { Schema, Document } from 'mongoose';

export interface IReview {
  userName: string;
  comment: string;
  rating: number;
  date: Date;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
  reviews: IReview[];
}

const ReviewSchema: Schema = new Schema({
  userName: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  reviews: [ReviewSchema]
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
