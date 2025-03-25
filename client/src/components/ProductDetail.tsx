import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToBag = () => {
    addItem(product, quantity);
    onClose();
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value)));
  };

  const isMobile = window.innerWidth <= 768;

  const ContentWrapper = isMobile ? Drawer : Dialog;
  const ContentComponent = isMobile ? DrawerContent : DialogContent;

  return (
    <ContentWrapper open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ContentComponent className="max-w-4xl w-full h-[90vh] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Image */}
          <div className="relative flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Product Details */}
          <div className="p-4 overflow-y-auto max-h-[85vh] md:max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">{product.brand}</p>
                <h2 className="text-xl font-medium">{product.name}</h2>
              </div>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-2xl font-medium">₹{product.price}</p>
            
            <div className="mb-4">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <Separator className="my-4" />

            {/* Quantity Control */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="w-8 h-8 flex items-center justify-center border border-zinc-300 hover:bg-zinc-200 transition-colors rounded-full"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-12 h-8 text-center border-t border-b border-gray-300"
                />
                <button
                  className="w-8 h-8 flex items-center justify-center border border-zinc-300 hover:bg-zinc-200 transition-colors rounded-full"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
            
            <Button 
              className="w-full bg-zinc-950 py-7 rounded-full hover:bg-nike-red transition-colors text-base font-medium"
              onClick={handleAddToBag}
            >
              Add to Bag
            </Button>

            <Separator className="my-6" />

            {/* Reviews Section */}
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Reviews</h3>
              <div className="space-y-4 overflow-y-auto max-h-[40vh]">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <p className="font-medium">{review.userName}</p>
                      <span className="mx-2 text-gray-300">•</span>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentComponent>
    </ContentWrapper>
  );
};

export default ProductDetail;