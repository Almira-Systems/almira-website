import Cookies from "js-cookie";
import { atomWithStorage, unwrap } from "jotai/utils";
import z from "zod";
import { CartFields, getCart } from "@/app/actions";
import { useFragment } from "@/types/gql";

type CartItem = {
  merchandiseId: string;
  quantity: number;
};

// type CartState = {
//   cartId: string;
//   items: CartItem[];
// };
const cartStateSchema = z.object({
  cartId: z.string(),
  items: z.array(z.object({ merchandiseId: z.string(), quantity: z.number() })),
});

type CartState = z.infer<typeof cartStateSchema>;

const fetchCartState = async () => {
  try {
    const cart = await getCart();
    return cart;
  } catch (e) {
    console.error(e);
  }
};

const cookieStore = {
  getItem: (key: string): CartState | undefined => {
    const rawCart = Cookies.get(key);
    if (rawCart) {
      return JSON.parse(rawCart) as CartState;
    }
  },
};

const _cartAtom = atomWithStorage(
  "cart",
  async () => {
    const initialState = await fetchCartState();
    if (!initialState) {
      return {
        cartId: "",
        items: [],
      };
    }
    const parsedCart = useFragment(CartFields, initialState);
    return {
      cartId: parsedCart.id,
      items: parsedCart.lines.nodes.map((node) => ({
        merchandiseId: node.merchandise.id,
        quantity: node.quantity,
      })),
    };
  },
  cookieStore,
);

export const cartAtom = unwrap(_cartAtom, (prev) => prev ?? "loading");
