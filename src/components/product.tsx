"use client";
import { type DocumentType } from "@/types/gql";
import Image from "next/image";
import styles from "./product.module.scss";
import { useRouter } from "next/navigation";
import { getPlaceholderImage } from "@/lib/utils";
import type { ProductCardFields } from "@/lib/queries";

interface ProductProps {
  product: DocumentType<typeof ProductCardFields>;
}

const Product = ({ product }: ProductProps) => {
  const router = useRouter();
  const pageRoute = `/product?h=${product.handle}`;
  const imageUrl =
    (product.images.nodes?.[0]?.url as string) ?? getPlaceholderImage(120, 120);
  return (
    <div
      onClick={() => router.push(pageRoute)}
      onMouseEnter={() => router.prefetch(pageRoute)}
      className={styles.product}
    >
      <Image
        src={imageUrl}
        alt={`${product.title} image`}
        width={120}
        height={120}
      />
      <h6>{product.title}</h6>
    </div>
  );
};

export default Product;
