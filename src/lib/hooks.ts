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
    cart: useFragment(CartFields, cartContext.cart),
    loading: cartContext.loading,
    refetch: cartContext.refetch,
  };
};

export interface ViewportBoundary {
  isOutside: boolean;
  directions: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  offsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

const initialState: ViewportBoundary = {
  isOutside: false,
  directions: { top: false, bottom: false, left: false, right: false },
  offsets: { top: 0, bottom: 0, left: 0, right: 0 },
};

export const useViewportBoundary = <T>() => {
  const [boundary, setBoundary] = useState(initialState);
  const ref = useRef<T | null>(null);

  const checkBoundaries = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vWidth = window.innerWidth || document.documentElement.clientWidth;
    const vHeight = window.innerHeight || document.documentElement.clientHeight;
    const offsets = {
      top: rect.top < 0 ? Math.abs(rect.top) : 0,
      bottom: rect.bottom > vHeight ? rect.bottom - vHeight : 0,
      left: rect.left < 0 ? Math.abs(rect.left) : 0,
      right: rect.right > vWidth ? rect.right - vWidth : 0,
    };
    const directions = {
      top: offsets.top > 0,
      bottom: offsets.bottom > 0,
      left: offsets.left > 0,
      right: offsets.right > 0,
    };
    const isOutside =
      directions.top ||
      directions.bottom ||
      directions.left ||
      directions.right;
    setBoundary((prev) => {
      const isSame =
        prev.isOutside === isOutside &&
        prev.offsets.top === offsets.top &&
        prev.offsets.bottom === offsets.bottom &&
        prev.offsets.left === offsets.left &&
        prev.offsets.right === offsets.right;
      return isSame ? prev : { isOutside, directions, offsets };
    });
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const handleUpdate = () => {
      checkBoundaries();
      animationFrameId = window.requestAnimationFrame(handleUpdate);
    };
    checkBoundaries();
    window.addEventListener("resize", handleUpdate, { passive: true });
    window.addEventListener("scroll", handleUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate);
    };
  }, [checkBoundaries]);
  return [ref, boundary] as const;
};
