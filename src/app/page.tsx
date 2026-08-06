import Product from "@/components/product";
import styles from "./index.module.scss";

import { query } from "@/lib/shopify";
import { useFragment } from "@/types/gql";
import {
  SparePartsAndConsumablesQuery,
  DevicesAndKitsQuery,
  ProductCardFields,
} from "@/lib/queries";

const getSparePartsAndConsumables = async () => {
  "use cache";
  const { products } = await query({
    query: SparePartsAndConsumablesQuery,
  });
  return products.nodes.map((n) => useFragment(ProductCardFields, n));
};

const getDevicesAndKits = async () => {
  "use cache";
  const { products } = await query({
    query: DevicesAndKitsQuery,
  });
  return products.nodes.map((n) => useFragment(ProductCardFields, n));
};

export default async function Home() {
  const sparePartsAndConsumables = await getSparePartsAndConsumables();
  const devicesAndKits = await getDevicesAndKits();

  const numReturns = 8;

  return (
    <main className={styles.main}>
      <section>
        {/* <div className={styles.card}> */}
        {/*   <h3>Devices</h3> */}
        {/*   <div> */}
        {/*     {devicesAndKits */}
        {/*       .filter((d) => d.productType == "Device") */}
        {/*       .slice(0, numReturns) */}
        {/*       .map((item) => ( */}
        {/*         <Product key={item.id} product={item} /> */}
        {/*       ))} */}
        {/*   </div> */}
        {/* </div> */}
        <div className={styles.card}>
          <h3>Parts</h3>
          <div>
            {sparePartsAndConsumables
              .filter((d) => d.productType == "Part")
              .slice(0, numReturns)
              .map((item) => (
                <Product key={item.id} product={item} />
              ))}
          </div>
        </div>
        {/* <div className={styles.card}> */}
        {/*   <h3>Kits</h3> */}
        {/*   <div> */}
        {/*     {devicesAndKits */}
        {/*       .filter((d) => d.productType == "Kit") */}
        {/*       .slice(0, numReturns) */}
        {/*       .map((item) => ( */}
        {/*         <Product key={item.id} product={item} /> */}
        {/*       ))} */}
        {/*   </div> */}
        {/* </div> */}
        <div className={styles.card}>
          <h3>Consumables</h3>
          <div>
            {sparePartsAndConsumables
              .filter((d) => d.productType == "Consumable")
              .slice(0, numReturns)
              .map((item) => (
                <Product key={item.id} product={item} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
