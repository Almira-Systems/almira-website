import styles from "./cart.module.scss";
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import { useCart } from "@/lib/hooks";
import { ProductCardFields } from "@/lib/queries";
import { useFragment } from "@/types/gql";
import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from "lucide-react";
import { removeFromCart, updateCartItem } from "../actions";
import { startTransition, useOptimistic, useState } from "react";

type CartItemProps = {
  item: NonNullable<
    ReturnType<typeof useCart>["cart"]
  >["lines"]["nodes"][number];
  refetchCart: () => Promise<void>;
};

export const CartItem = ({ item, refetchCart }: CartItemProps) => {
  const product = useFragment(ProductCardFields, item.merchandise.product);
  const title =
    item.merchandise.title === "Default Title"
      ? product.title
      : ` (${item.merchandise.title}) ${product.title}`;
  const [oQuantity, updateOQuantity] = useOptimistic(item.quantity);
  const [disableQChange, setDisableQChange] = useState(false);
  return (
    <span className={styles.cart_item}>
      <Button
        disabled={disableQChange}
        onClick={() => {
          setDisableQChange(true);
          startTransition(async () => {
            updateOQuantity((q) => q - 1);
            try {
              if (item.quantity < 2) {
                await removeFromCart({ lineId: item.id });
              } else {
                await updateCartItem({
                  lineId: item.id,
                  quantity: item.quantity - 1,
                });
              }
            } catch (e) {
              console.error(e);
            } finally {
              await refetchCart();
              setDisableQChange(false);
            }
          });
        }}
      >
        <MinusIcon />
      </Button>
      <p>x{oQuantity}</p>
      <Button
        disabled={disableQChange}
        onClick={() => {
          setDisableQChange(true);
          startTransition(async () => {
            updateOQuantity((q) => q + 1);
            try {
              await updateCartItem({
                lineId: item.id,
                quantity: item.quantity + 1,
              });
            } catch (e) {
              console.error(e);
            } finally {
              await refetchCart();
              setDisableQChange(false);
            }
          });
        }}
      >
        <PlusIcon />
      </Button>
      <p>| {title}</p>
    </span>
  );
};

const Cart = () => {
  const { cart, refetch } = useCart();

  const cartOptions =
    cart?.lines.nodes.map((item) => {
      return {
        label: <CartItem item={item} refetchCart={refetch} />,
        value: item.id,
        wrap: true,
      };
    }) ?? [];
  if (cartOptions.length > 0) {
    const currentTotal = cart?.lines.nodes?.reduce(
      (a, b) => a + b.quantity * (b.cost.totalAmount.amount as number),
      0,
    );
    cartOptions.push({
      label: (
        <footer className={styles.cart_footer}>
          <span>
            <Button>View Cart</Button>
            <Button>Checkout</Button>
          </span>
          <h2 className={styles.cart_total}>
            Total: ${Number(currentTotal).toFixed(2)}
          </h2>
        </footer>
      ),
      value: "",
      wrap: false,
    });
  } else {
    cartOptions.push({
      label: <p>Your cart is empty!</p>,
      value: "",
      wrap: false,
    });
  }
  return (
    <Dropdown
      sticky={true}
      positionMethod="fixed"
      separators={true}
      trigger={
        <>
          <ShoppingCartIcon />
          <p>{cart?.lines?.nodes?.reduce((a, b) => a + b.quantity, 0)}</p>
          <ChevronDownIcon />
        </>
      }
      options={cartOptions}
    />
  );
};

export default Cart;
