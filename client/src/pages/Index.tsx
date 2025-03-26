import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import ProductDetail from '@/components/ProductDetail';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import axios from 'axios';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://channel-blend-assignment.onrender.com/api/products');
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const closeProductDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      
      <main className="flex-grow md:px-8 px-2 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-medium mb-8 mt-8">Featured Products</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className=" relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="p-4">
                <p className="text-sm font-medium text-zinc-500">{product.brand}</p>
                  <h2 className="text-xl font-medium">{product.name}</h2>
                  <p className="font-medium mt-2">MRP : ₹{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
            
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          isOpen={isDetailOpen} 
          onClose={closeProductDetail} 
        />
      )}
    </div>
  );
};

export default Index;
