"use client";
import { createContext, Suspense, useEffect, useState } from "react";
import { getCart } from "../actions";

type CartData = {
  cart: Awaited<ReturnType<typeof getCart>> | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

export const CartContext = createContext<CartData | null>(null);

export const CartWrapper = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartData["cart"] | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setCart(cart);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <CartContext.Provider value={{ cart, loading, refetch: () => fetchCart() }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartWrapper;
