"use client";
import { getPlaceholderImage } from "@/lib/utils";
import Image from "next/image";
import { type DocumentType } from "@/types/gql";
import styles from "../product_page.module.scss";
import { useState } from "react";
import Button from "@/components/button";
import { addToCart } from "@/app/actions";
import { useCart } from "@/lib/hooks";
import type { ProductCardFields } from "@/lib/queries";
interface ProductProps {
  product: DocumentType<typeof ProductCardFields>;
}

const ProductInfo = ({ product }: ProductProps) => {
  const imageUrl =
    (product?.images?.nodes?.[0]?.url as string) ??
    getPlaceholderImage(360, 360);

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.nodes?.[0],
  );
  const [quantity, setQuantity] = useState(1);
  const { refetch } = useCart();

  const variants = product.variants.nodes.filter(
    (n) => n.title !== "Default Title",
  );

  return (
    <section>
      <Image
        src={imageUrl}
        alt={`${product.title} image`}
        width={360}
        height={360}
      />
      <div className={styles.price_info}>
        <h6>Available: {product.availableForSale ? "Yes" : "No"}</h6>
        <h6>
          In Stock:{" "}
          {variants.reduce((prev, n) => (prev += n?.quantityAvailable ?? 0), 0)}
        </h6>
        {variants.length > 0 ? (
          <label>
            Variant:&nbsp;
            <select
              onChange={(e) =>
                setSelectedVariant(
                  variants.find((n) => n.id === e.target.value),
                )
              }
            >
              {variants.map((n) => (
                <option value={n.id} key={n.id}>
                  {n.title}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <h6>Price: ${Number(selectedVariant?.price.amount).toFixed(2)}</h6>
        <div></div>
        <div>
          <Button
            onClick={async () => {
              if (selectedVariant) {
                await addToCart({
                  quantity,
                  variantId: selectedVariant.id,
                });
                refetch();
              }
            }}
          >
            Add to cart
          </Button>
          <label>
            QTY:&nbsp;
            <input
              type="number"
              min="1"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>
        </div>
        {["Part", "Consumable"].includes(product.productType) ? null : (
          <Button disabled>Get a quote</Button>
        )}
      </div>
    </section>
  );
};

export default ProductInfo;
