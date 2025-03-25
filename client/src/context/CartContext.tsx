
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types/product';
import { toast } from "sonner";

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity: number) => void;
    removeItem: (productId: string,) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(items));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [items]);

    const addItem = (product: Product, quantity: number) => {
        setItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.product.id === product.id
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                toast.success(`Updated ${product.name} quantity in your bag`);
                return updatedItems;
            } else {
                toast.success(`Added ${product.name} to your bag`);
                return [...prevItems, { product, quantity}];
            }
        });
    };

    const removeItem = (productId: string,) => {
        setItems(prevItems => {
            const removedItem = prevItems.find(item => item.product.id === productId);
            if (removedItem) {
                toast.success(`Removed ${removedItem.product.name} from your bag`);
            }
            return prevItems.filter(item => !(item.product.id === productId));
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        toast.success("Your bag has been cleared");
    };

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
