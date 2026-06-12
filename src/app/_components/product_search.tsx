import { useClickOutside } from "@/lib/hooks";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState, useMemo, useEffect } from "react";
import { searchProducts } from "../actions";
import styles from "./product_search.module.scss";
import Image from "next/image";
import Form from "next/form";
import { useFragment } from "@/types/gql";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { MetaobjectFields } from "@/lib/gql";

const ProductSearch = () => {
  const router = useRouter();
  const [state, searchAction, pending] = useActionState(searchProducts, null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");

  const onInputChange = useMemo(
    () =>
      debounce((event) => {
        if (event.target.value.length > 2 && searchFormRef.current) {
          searchFormRef.current.requestSubmit();
        } else {
          setShowResults(false);
        }
      }, 350),
    [],
  );

  useClickOutside(searchResultsRef, () => setShowResults(false));
  useEffect(() => {
    if ((state?.products?.length ?? 0) > 0 && searchValue.length > 2) {
      setShowResults(true);
    }
    return () => {
      setShowResults(false);
    };
  }, [state]);

  const [autocompleteItems, setAutocompleteItems] = useState<
    NonNullable<NonNullable<typeof state>>["products"]
  >(state?.products);

  useEffect(() => {
    if ((state?.products?.length ?? 0) > 0) {
      setAutocompleteItems(state?.products);
    }
  }, [state]);

  return (
    <Form action={searchAction} ref={searchFormRef} className={styles.form}>
      <Autocomplete.Root
        items={autocompleteItems}
        value={searchValue}
        onValueChange={(newVal) => {
          setSearchValue(newVal);
        }}
        itemToStringValue={(item) => item.title}
      >
        <Autocomplete.Portal hidden={!showResults}>
          <Autocomplete.Positioner
            className={styles.search_results_positioner}
            sideOffset={4}
            align="start"
          >
            <Autocomplete.Popup
              className={styles.search_results_popup}
              aria-busy={pending || undefined}
            >
              <Autocomplete.List>
                {(
                  product: NonNullable<typeof autocompleteItems>[number],
                  index,
                ) => {
                  const models = product.models
                    ?.map((m) =>
                      useFragment(
                        MetaobjectFields,
                        m?.references?.nodes.filter(
                          (n) => n.__typename === "Metaobject",
                        ),
                      ),
                    )
                    .flat()
                    .filter((p) => p);
                  const relatedProducts = product.related_products
                    .map((p) =>
                      useFragment(
                        MetaobjectFields,
                        p?.references?.nodes?.filter(
                          (p) => p.__typename === "Metaobject",
                        ),
                      ),
                    )
                    .flat()
                    .filter((p) => p);
                  return (
                    <div key={product.id + index}>
                      <div
                        className={styles.search_result}
                        key={product.id}
                        onClick={() => {
                          router.push(`/product?h=${product.handle}`);
                          setShowResults(false);
                        }}
                        onMouseEnter={() =>
                          router.prefetch(`/product?h=${product.handle}`)
                        }
                      >
                        {product.images.nodes?.[0]?.url ? (
                          <Image
                            src={product.images.nodes?.[0]?.url as string}
                            alt={`${product.title} image`}
                            width={120}
                            height={120}
                          />
                        ) : null}
                        <div>
                          <header>
                            <h5>{product.title}</h5>
                          </header>
                          <main>
                            <h5>
                              $
                              {Number(
                                product.priceRange.minVariantPrice.amount,
                              ).toFixed(2)}{" "}
                              - $
                              {Number(
                                product.priceRange.maxVariantPrice.amount,
                              ).toFixed(2)}
                            </h5>
                            <p>
                              {product.variants.nodes.length > 0
                                ? ` (${product.variants.nodes.length} variant${
                                    product.variants.nodes.length > 1 ? "s" : ""
                                  })`
                                : ""}
                            </p>
                          </main>
                          <footer>
                            {["Device", "Kit"].includes(product.productType) ? (
                              <p>Quote available</p>
                            ) : relatedProducts.length > 0 ? (
                              <span>
                                For device models:{" "}
                                {relatedProducts.map((p, i) => (
                                  <>
                                    &nbsp;{p?.modelNumber?.value}
                                    {i < relatedProducts.length - 1 && ","}
                                    &nbsp;
                                  </>
                                ))}
                              </span>
                            ) : null}
                          </footer>
                        </div>
                      </div>
                      {(autocompleteItems?.length ?? 0) > index + 1 ? (
                        <hr />
                      ) : null}
                    </div>
                  );
                }}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
        <Autocomplete.Input
          id="product_search"
          type="text"
          placeholder="Search by device name or part number..."
          name="search"
          value={searchValue}
          onChangeCapture={(e) => setSearchValue(e.target.value)}
          onChange={onInputChange}
        />
      </Autocomplete.Root>
    </Form>
  );
};

export default ProductSearch;
