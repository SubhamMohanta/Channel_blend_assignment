
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;

  const handleRemove = () => {
    removeItem(product.id);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div className="flex border-b border-gray-100 py-4">
      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="text-sm text-gray-500 mt-1"></p>
          </div>
          <div className="text-right">
            <p className="font-bold">₹{product.price}</p>
            <p className="text-sm text-gray-500 mt-1">
              ₹{(product.price * quantity).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full border-gray-200"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-3 min-w-8 text-center">{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full border-gray-200"
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
