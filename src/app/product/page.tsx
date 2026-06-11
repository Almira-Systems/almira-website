import { shopifyFetch } from "@/lib/shopify";
import { graphql, useFragment, type DocumentType } from "@/types/gql";
import { Suspense } from "react";
import Product from "@/components/product";
import styles from "./product_page.module.scss";
import Carousel from "@/components/carousel";
import { notFound } from "next/navigation";
import { MetaobjectFields } from "@/lib/gql";
import ProductInfo from "./_components/product_info";
import {
  GetProductByIdQuery,
  GetRelatedDevicesQuery,
  ProductCardFields,
} from "@/lib/queries";

interface ProductPageProps {
  searchParams: Promise<{
    h: string;
  }>;
}

const getRelatedParts = async (
  productModels: DocumentType<typeof MetaobjectFields>[],
) => {
  "use cache";
  const searchQuery = `(product_type:Part OR product_type:Consumable OR product_type:Service)`;
  const { products } = await shopifyFetch({
    query: GetRelatedDevicesQuery,
    variables: {
      searchQuery: searchQuery,
    },
  });
  const parsedProducts = useFragment(ProductCardFields, products.nodes);
  const productsToShow = [];
  for (const p of parsedProducts) {
    if (p.related_products.filter((p) => p).length > 0) {
      const relatedDeviceModelNums = p.related_products.flatMap((m) =>
        useFragment(
          MetaobjectFields,
          m!.references!.nodes.filter((n) => n.__typename === "Metaobject"),
        ).map((m) => m.modelNumber?.value),
      );
      if (
        relatedDeviceModelNums.some((m) =>
          productModels.map((m2) => m2.modelNumber?.value).includes(m),
        )
      ) {
        productsToShow.push(p);
      }
    }
  }
  return productsToShow;
};
const getRelatedDevices = async (
  relatedModels: DocumentType<typeof MetaobjectFields>[],
) => {
  "use cache";
  const searchQuery = `(product_type:Device OR product_type:Kit)`;
  const { products } = await shopifyFetch({
    query: GetRelatedDevicesQuery,
    variables: {
      searchQuery: searchQuery,
    },
  });
  const parsedProducts = useFragment(ProductCardFields, products.nodes);
  const productsToShow = [];
  for (const p of parsedProducts) {
    const relatedDeviceModelNums = relatedModels.map(
      (m) => m.modelNumber?.value,
    );
    const parsedModels = p.models
      .filter((m) => m)
      .flatMap((m) =>
        m?.references?.nodes.filter((n) => n.__typename === "Metaobject"),
      )
      .map((m) => useFragment(MetaobjectFields, m));
    if (
      relatedDeviceModelNums.some((m) =>
        parsedModels.map((m2) => m2?.modelNumber?.value).includes(m),
      )
    ) {
      productsToShow.push(p);
    }
  }
  return productsToShow;
};

const getProductByHandle = async (handle: string) => {
  "use cache";
  const { product } = await shopifyFetch({
    query: GetProductByIdQuery,
    variables: { handle },
  });
  const parsedProduct = useFragment(ProductCardFields, product);
  if (!parsedProduct) return { product: null, forDeviceModels: [] };
  const productModels = [];
  const relatedModels = [];

  for (const model of parsedProduct.models.flatMap(
    (m) => m?.references?.nodes ?? [],
  )) {
    if (model.__typename === "Metaobject") {
      const resolvedModel = useFragment(MetaobjectFields, model);
      productModels.push(resolvedModel);
    }
  }
  for (const model of parsedProduct.related_products.flatMap(
    (m) => m?.references?.nodes ?? [],
  )) {
    if (model.__typename === "Metaobject") {
      const resolvedModel = useFragment(MetaobjectFields, model);
      relatedModels.push(resolvedModel);
    }
  }

  return { product: parsedProduct, productModels, relatedModels };
};

const ProductPage = async ({ searchParams }: ProductPageProps) => {
  const { h } = await searchParams;
  const { product, productModels, relatedModels } = await getProductByHandle(h);
  if (!product) {
    notFound();
  }
  const relatedDevices = await getRelatedDevices(relatedModels);
  const relatedParts = await getRelatedParts(productModels);

  return (
    <Suspense>
      <main className={styles.main}>
        <header>
          <h4>{product.title}</h4>
          <p>{product.description}</p>
        </header>
        <ProductInfo product={product} />
        <div className={styles.related}>
          {["Part", "Consumable", "Service"].includes(product.productType) ? (
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
