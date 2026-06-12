"use client";

import { CartContext } from "@/app/_components/cart_wrapper";
import { useFragment } from "@/types/gql";
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  type RefObject,
} from "react";
import { CartFields } from "@/lib/queries";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export const useCart = () => {
  const cartContext = useContext(CartContext); 
  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return {
    cart: cartContext.cart,
    loading: cartContext.loading,
    refetch: cartContext.refetch,
  };
};
