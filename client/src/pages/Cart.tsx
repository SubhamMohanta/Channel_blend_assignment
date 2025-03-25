import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />

      <main className="flex-grow pt-20 px-4 md:px-8 lg:px-36">
        <div className="container mx-auto">
          <div className="mb-8">
            <p className="text-2xl font-medium mb-2">My Bag</p>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Items ({totalItems})</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-gray-500 hover:text-[#FF0102]"
                    >
                      Clear All
                    </Button>
                  </div>

                  <Separator className="mb-4" />

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-1"
                  >
                    {items.map((item) => (
                      <motion.div key={item.product.id} variants={itemVariants}>
                        <CartItem item={item} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="p-6 bg-white rounded-lg sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link to="/">
                    <Button className="w-full py-7 bg-zinc-950 hover:bg-[#FF0102] transition-colors rounded-full">
                      Explore more products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Your bag is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your bag yet.</p>
              <Link
                to="/"
                className="bg-zinc-950 text-white px-6 py-7 rounded-full inline-block hover:bg-[#FF0102] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
