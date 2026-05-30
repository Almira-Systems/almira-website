import { shopifyFetch } from "@/lib/shopify";
import { graphql, useFragment, type DocumentType } from "@/types/gql";
import { Suspense } from "react";
import Product, { ProductCardFields } from "@/components/product";
import Image from "next/image";
import styles from "./product_page.module.scss";
import Carousel from "@/components/carousel";
import { getPlaceholderImage } from "@/lib/utils";
import { notFound } from "next/navigation";
import { MetaobjectFields } from "@/lib/gql";

interface ProductPageProps {
  searchParams: Promise<{
    h: string;
  }>;
}

const getProductByIdQuery = graphql(/* gql */ `
  query ProductById($handle: String!) {
    product(handle: $handle) {
      id
      title
      ...ProductCardFields
    }
  }
`);

const getRelatedDevicesQuery = graphql(/* gql */ `
  query RelatedDevices($searchQuery: String!) {
    products(first: 12, query: $searchQuery) {
      nodes {
        id
        title
        ...ProductCardFields
      }
    }
  }
`);

const getRelatedParts = async (
  product: DocumentType<typeof ProductCardFields>,
) => {
  console.log({
    product,

    t: product?.for_device_models,
  });
  const models = product?.for_device_models
    ?.map((m) => m?.references?.nodes)
    .flat()
    ?.map((m) => {
      if (m?.__typename === "Metaobject") {
        return useFragment(MetaobjectFields, m);
      }
    });
  const searchQuery = `-handle:${product.handle}`;
  console.log({ searchQuery });
  const { products } = await shopifyFetch({
    query: getRelatedDevicesQuery,
    variables: {
      searchQuery: searchQuery,
    },
  });
  const parsedProducts = useFragment(ProductCardFields, products.nodes);
  return parsedProducts;
};
const getRelatedDevices = async (
  product: DocumentType<typeof ProductCardFields>,
) => {
  console.log({
    product,
  });
  const models = product?.for_device_models
    ?.map((m) => m?.references?.nodes)
    .flat()
    ?.map((m) => {
      if (m?.__typename === "Metaobject") {
        return useFragment(MetaobjectFields, m);
      }
    });
  const { products } = await shopifyFetch({
    query: getRelatedDevicesQuery,
    variables: {
      searchQuery: `metafields.custom.models:(${models.map((m) => m?.id).join(" OR ")}) AND NOT handle:${product.handle} AND product_type:Device OR product_type:Kit`,
    },
  });
  const parsedProducts = useFragment(ProductCardFields, products.nodes);
  return parsedProducts;
};

const getProductByHandle = async (handle: string) => {
  const { product } = await shopifyFetch({
    query: getProductByIdQuery,
    variables: { handle },
  });
  const parsedProduct = useFragment(ProductCardFields, product);

  const models = [];
  console.log({ parsedProduct });
  for (const m of parsedProduct?.for_device_models
    .map((d) => d?.references?.nodes)
    .flat() ?? []) {
    if (m?.__typename === "Metaobject") {
      const resolvedModel = useFragment(MetaobjectFields, m);
      models.push(resolvedModel);
    }
  }

  return { product: parsedProduct, forDeviceModels: models };
};

const ProductPage = async ({ searchParams }: ProductPageProps) => {
  const { h } = await searchParams;
  const { product } = await getProductByHandle(h);
  if (!product) {
    notFound();
  }
  const relatedDevices = await getRelatedDevices(product);
  const relatedParts = await getRelatedParts(product);

  const imageUrl =
    (product?.images.nodes?.[0]?.url as string) ??
    getPlaceholderImage(360, 360);

  console.log({ relatedDevices, relatedParts });

  return (
    <Suspense>
      <main className={styles.main}>
        <h3>{product.title}</h3>
        <Image
          src={imageUrl}
          alt={`${product.title} image`}
          width={360}
          height={360}
        />
        <p>{product.description}</p>
        <div>
          {["Part", "Consumable"].includes(product.productType) ? (
            <>
              <h5>Devices that use this product</h5>
              <Carousel
                items={relatedDevices.map((p) => ({
                  key: p.id + "related-devices",
                  element: <Product key={p.id} product={p} />,
                }))}
              />
            </>
          ) : null}
          {["Device", "Kit"].includes(product.productType) ? (
            <>
              <h5>Parts for this device</h5>
              <Carousel
                items={relatedParts.map((p) => ({
                  key: p.id + "related-parts",
                  element: <Product key={p.id} product={p} />,
                }))}
              />
            </>
          ) : null}
        </div>
      </main>
    </Suspense>
  );
};

export default ProductPage;
