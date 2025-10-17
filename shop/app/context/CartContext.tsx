'use client'
import { createContext, useContext, useState } from "react";

interface Product {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    images: string[];
    description?: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    showCart: boolean;
    setShowCart: (show: boolean) => void;
    cartItems: CartItem[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty: () => void;
    decQty: () => void;
    addProduct: (product: Product, quantity: number) => void;
    removeProduct: (productId: string) => void;
    updateProductQuantity: (productId: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [qty, setQty] = useState(1);

    // Calculate totals from cart items
    const calculateTotals = (items: CartItem[]) => {
        return items.reduce(
            (acc, item) => ({
                totalPrice: acc.totalPrice + (item.price * item.quantity),
                totalQuantities: acc.totalQuantities + item.quantity
            }),
            { totalPrice: 0, totalQuantities: 0 }
        );
    };

    // Get current totals
    const { totalPrice, totalQuantities } = calculateTotals(cartItems);

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    const addProduct = (product: Product, quantity: number) => {
        const productExists = cartItems.find(item => item.id === product.id);

        if (productExists) {
            // Update existing product quantity
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            // Add new product to cart
            setCartItems(prevItems => [...prevItems, { ...product, quantity }]);
        }
    }

    const removeProduct = (productId: string) => {
        // Remove the product
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }

    const updateProductQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeProduct(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    }

    return (
        <CartContext.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                addProduct,
                removeProduct,
                updateProductQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}