import Product, { ProductCardFields } from "@/components/product";
import type { Product as ProductType } from "@/types/gql/graphql";
import styles from "./index.module.scss";

import { shopifyFetch } from "@/lib/shopify";
import { graphql } from "@/types/gql";
import Carousel from "@/components/carousel";

const sparePartsAndConsumablesQuery = graphql(/* gql */ `
  query SparePartsAndConsumables {
    products(first: 50, query: "product_type:Part OR product_type:Consumable") {
      edges {
        node {
          id
          ...ProductCardFields
          for_device_models: metafields(
            identifiers: [{ namespace: "custom", key: "models" }]
          ) {
            references(first: 10) {
              edges {
                node {
                  __typename
                  ... on Metaobject {
                    id
                    model_number: field(key: "name") {
                      value
                    }
                    handle
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

const devicesAndKitsQuery = graphql(/* gql */ `
  query DevicesAndKits {
    products(first: 50, query: "product_type:Device OR product_type:Kit") {
      edges {
        node {
          id
          ...ProductCardFields
          models: metafields(
            identifiers: [{ namespace: "custom", key: "models" }]
          ) {
            references(first: 10) {
              edges {
                node {
                  __typename
                  ... on Metaobject {
                    id
                    model_number: field(key: "name") {
                      value
                    }
                    handle
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);
const getSparePartsAndConsumables = async () => {
  "use cache";
  const { products } = await shopifyFetch({
    query: sparePartsAndConsumablesQuery,
  });
  return products;
};

const getDevicesAndKits = async () => {
  "use cache";
  const { products } = await shopifyFetch({
    query: devicesAndKitsQuery,
  });
  return products;
};

export default async function Home() {
  const sparePartsAndConsumables = await getSparePartsAndConsumables();
  const devicesAndKits = await getDevicesAndKits();

  console.log({ devicesAndKits, sparePartsAndConsumables });

  // const { productsByModels } = await getModelsAndProducts();
  //
  // console.log({ devicesWithModels, partsWithModels });

  return (
    <main className={styles.main}>
      <section>
        <div className={styles.card}>
          <h3>Popular Items</h3>
        </div>
        <div className={styles.card}>
          <h3>Devices {"&"} Kits</h3>
          <div>
            {devicesAndKits.edges.slice(0, 4).map((edge) => (
              <Product key={edge.node.id} product={edge.node} />
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <h3>Spare Parts {"&"} Consumables</h3>
          <Carousel
            items={sparePartsAndConsumables.edges.slice(0, 6).map((edge) => ({
              element: <Product key={edge.node?.id} product={edge.node} />,
            }))}
          />
          <div></div>
        </div>
      </section>
    </main>
  );
}
