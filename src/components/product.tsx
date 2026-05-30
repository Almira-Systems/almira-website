"use client";
import {
  graphql,
  useFragment,
  type FragmentType,
  type DocumentType,
} from "@/types/gql";
import Image from "next/image";
import styles from "./product.module.scss";
import { useRouter } from "next/navigation";
import { getPlaceholderImage } from "@/lib/utils";

export const ProductCardFields = graphql(/* gql */ `
  fragment ProductCardFields on Product {
    id
    title
    handle
    description
    productType
    images(first: 5) {
      nodes {
        id
        url
      }
    }
    for_device_models: metafields(
      identifiers: [{ namespace: "custom", key: "models" }]
    ) {
      references(first: 10) {
        nodes {
          __typename
          ... on Metaobject {
            ...MetaobjectDetails
          }
        }
      }
    }
  }
`);

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
