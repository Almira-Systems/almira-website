"use server";
import { CartFields, ProductCardFields } from "@/lib/queries";
import { shopifyFetch } from "@/lib/shopify";
import { useFragment } from "@/types/gql";
import { cookies } from "next/headers";
import { zfd } from "zod-form-data";
import {
  AddCartLineItemQuery,
  CreateNewCartQuery,
  GetCartQuery,
  PredictiveSearchQuery,
  RemoveCartLineItemQuery,
  UpdateCartLineItemQuery,
} from "@/lib/queries";

const searchProductsSchema = zfd.formData({
  search: zfd.text(),
});

export async function searchProducts(_prevData: any, formData: FormData) {
  const { success, data, error } = searchProductsSchema.safeParse(formData);
  console.log({ data, success, error });
  if (!success) {
    return {
      error,
    };
  }

  const { predictiveSearch } = await shopifyFetch({
    query: PredictiveSearchQuery,
    variables: {
      search: `${data.search}`,
    },
  });

  const products = predictiveSearch?.products.map((n) =>
    useFragment(ProductCardFields, n),
  );
  console.log({ products });
  return { products };
}

export const getCart = async () => {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    if (!cartId) {
      const { cartCreate } = await shopifyFetch({
        query: CreateNewCartQuery,
      });
      const parsedCart = useFragment(CartFields, cartCreate?.cart);
      cookieStore.set("cartId", `${parsedCart?.id}`);
      return parsedCart;
    }
    const { cart } = await shopifyFetch({
      query: GetCartQuery,
      variables: { cartId },
    });
    return cart;
  } catch (e) {
    console.error(e);
  }
};

interface AddToCartProps {
  variantId: string;
  quantity: number;
}

export const addToCart = async ({ variantId, quantity }: AddToCartProps) => {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    if (!cartId) {
      return;
    }
    console.log({ cartId, variantId, quantity });
    const { cartLinesAdd } = await shopifyFetch({
      query: AddCartLineItemQuery,
      variables: { cartId, variantId, quantity },
    });
    return cartLinesAdd;
  } catch (e) {
    console.error(e);
  }
};

export const removeFromCart = async ({ lineId }: { lineId: string }) => {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    if (!cartId) {
      return;
    }
    const { cartLinesRemove } = await shopifyFetch({
      query: RemoveCartLineItemQuery,
      variables: { cartId, lineId },
    });
    return cartLinesRemove;
  } catch (e) {
    console.error(e);
  }
};

export const updateCartItem = async ({
  lineId,
  quantity,
}: {
  lineId: string;
  quantity: number;
}) => {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    if (!cartId) {
      return;
    }
    const { cartLinesUpdate } = await shopifyFetch({
      query: UpdateCartLineItemQuery,
      variables: { cartId, lineId, quantity },
    });
    return cartLinesUpdate;
  } catch (e) {
    console.error(e);
  }
};
