/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment MetaobjectDetails on Metaobject {\n    id\n    handle\n    type\n    modelNumber: field(key: \"name\") {\n      value\n    }\n  }\n": typeof types.MetaobjectDetailsFragmentDoc,
    "\n  query RelatedDevices($modelFilters: [ProductFilter!]) {\n    collection(handle: \"all\") {\n      products(first: 20, filters: $modelFilters) {\n        nodes {\n          id\n          title\n          ...ProductCardFields\n        }\n      }\n    }\n  }\n": typeof types.RelatedDevicesDocument,
    "\n  query GetDevicesByModels($modelNumbers: [String!]!) {\n    products(first: 100, query: \"product_type:Device\") {\n      nodes {\n        id\n        title\n        handle\n      }\n    }\n  }\n": typeof types.GetDevicesByModelsDocument,
    "\n  mutation CreateNewCart {\n    cartCreate {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n": typeof types.CreateNewCartDocument,
    "\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    lines(first: 50) {\n      nodes {\n        id\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            selectedOptions {\n              name\n              value\n            }\n            sku\n            availableForSale\n            image {\n              url\n            }\n            product {\n              ...ProductCardFields\n            }\n          }\n        }\n        quantity\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n": typeof types.CartFieldsFragmentDoc,
    "\n  query GetCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartFields\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  query PredictiveSearch($search: String!) {\n    predictiveSearch(query: $search, types: [PRODUCT, QUERY], limit: 5) {\n      products {\n        ...ProductCardFields\n      }\n      queries {\n        text\n      }\n    }\n  }\n": typeof types.PredictiveSearchDocument,
    "\n  query SearchProducts($search: String!) {\n    search(first: 50, query: $search, sortKey: RELEVANCE) {\n      nodes {\n        ... on Product {\n          id\n          ...ProductCardFields\n        }\n      }\n    }\n  }\n": typeof types.SearchProductsDocument,
    "\n  fragment ProductCardFields on Product {\n    id\n    title\n    handle\n    description\n    productType\n    availableForSale\n    priceRange {\n      minVariantPrice {\n        amount\n      }\n      maxVariantPrice {\n        amount\n      }\n    }\n    tags\n    totalInventory\n    variants(first: 50) {\n      nodes {\n        id\n        title\n        price {\n          amount\n        }\n        availableForSale\n        quantityAvailable\n        sku\n      }\n    }\n    images(first: 5) {\n      nodes {\n        id\n        url\n      }\n    }\n    related_products: metafields(\n      identifiers: [{ namespace: \"custom\", key: \"related_products\" }]\n    ) {\n      references(first: 50) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            id\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n    models: metafields(identifiers: [{ namespace: \"custom\", key: \"models\" }]) {\n      references(first: 50) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            id\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProductCardFieldsFragmentDoc,
    "\n  query ProductById($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      ...ProductCardFields\n    }\n  }\n": typeof types.ProductByIdDocument,
    "\n  query GetRelatedDevices($searchQuery: String!) {\n    products(first: 50, query: $searchQuery) {\n      nodes {\n        id\n        title\n        ...ProductCardFields\n      }\n    }\n  }\n": typeof types.GetRelatedDevicesDocument,
    "\n  query SparePartsAndConsumables {\n    products(first: 50, query: \"product_type:Part OR product_type:Consumable\") {\n      nodes {\n        id\n        ...ProductCardFields\n      }\n    }\n  }\n": typeof types.SparePartsAndConsumablesDocument,
    "\n  query DevicesAndKits {\n    products(first: 50, query: \"product_type:Device OR product_type:Kit\") {\n      nodes {\n        id\n        ...ProductCardFields\n      }\n    }\n  }\n": typeof types.DevicesAndKitsDocument,
    "\n  mutation AddCartLineItem($cartId: ID!, $variantId: ID!, $quantity: Int) {\n    cartLinesAdd(\n      cartId: $cartId\n      lines: [{ quantity: $quantity, merchandiseId: $variantId }]\n    ) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n": typeof types.AddCartLineItemDocument,
    "\n  mutation RemoveCartLineItem($cartId: ID!, $lineId: ID!) {\n    cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n": typeof types.RemoveCartLineItemDocument,
    "\n  mutation UpdateCartLineItem($cartId: ID!, $lineId: ID!, $quantity: Int) {\n    cartLinesUpdate(\n      cartId: $cartId\n      lines: [{ id: $lineId, quantity: $quantity }]\n    ) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n": typeof types.UpdateCartLineItemDocument,
};
const documents: Documents = {
    "\n  fragment MetaobjectDetails on Metaobject {\n    id\n    handle\n    type\n    modelNumber: field(key: \"name\") {\n      value\n    }\n  }\n": types.MetaobjectDetailsFragmentDoc,
    "\n  query RelatedDevices($modelFilters: [ProductFilter!]) {\n    collection(handle: \"all\") {\n      products(first: 20, filters: $modelFilters) {\n        nodes {\n          id\n          title\n          ...ProductCardFields\n        }\n      }\n    }\n  }\n": types.RelatedDevicesDocument,
    "\n  query GetDevicesByModels($modelNumbers: [String!]!) {\n    products(first: 100, query: \"product_type:Device\") {\n      nodes {\n        id\n        title\n        handle\n      }\n    }\n  }\n": types.GetDevicesByModelsDocument,
    "\n  mutation CreateNewCart {\n    cartCreate {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n": types.CreateNewCartDocument,
    "\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    lines(first: 50) {\n      nodes {\n        id\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            selectedOptions {\n              name\n              value\n            }\n            sku\n            availableForSale\n            image {\n              url\n            }\n            product {\n              ...ProductCardFields\n            }\n          }\n        }\n        quantity\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n": types.CartFieldsFragmentDoc,
    "\n  query GetCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartFields\n    }\n  }\n": types.GetCartDocument,
    "\n  query PredictiveSearch($search: String!) {\n    predictiveSearch(query: $search, types: [PRODUCT, QUERY], limit: 5) {\n      products {\n        ...ProductCardFields\n      }\n      queries {\n        text\n      }\n    }\n  }\n": types.PredictiveSearchDocument,
    "\n  query SearchProducts($search: String!) {\n    search(first: 50, query: $search, sortKey: RELEVANCE) {\n      nodes {\n        ... on Product {\n          id\n          ...ProductCardFields\n        }\n      }\n    }\n  }\n": types.SearchProductsDocument,
    "\n  fragment ProductCardFields on Product {\n    id\n    title\n    handle\n    description\n    productType\n    availableForSale\n    priceRange {\n      minVariantPrice {\n        amount\n      }\n      maxVariantPrice {\n        amount\n      }\n    }\n    tags\n    totalInventory\n    variants(first: 50) {\n      nodes {\n        id\n        title\n        price {\n          amount\n        }\n        availableForSale\n        quantityAvailable\n        sku\n      }\n    }\n    images(first: 5) {\n      nodes {\n        id\n        url\n      }\n    }\n    related_products: metafields(\n      identifiers: [{ namespace: \"custom\", key: \"related_products\" }]\n    ) {\n      references(first: 50) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            id\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n    models: metafields(identifiers: [{ namespace: \"custom\", key: \"models\" }]) {\n      references(first: 50) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            id\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n  }\n": types.ProductCardFieldsFragmentDoc,
    "\n  query ProductById($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      ...ProductCardFields\n    }\n  }\n": types.ProductByIdDocument,
    "\n  query GetRelatedDevices($searchQuery: String!) {\n    products(first: 50, query: $searchQuery) {\n      nodes {\n        id\n        title\n        ...ProductCardFields\n      }\n    }\n  }\n": types.GetRelatedDevicesDocument,
    "\n  query SparePartsAndConsumables {\n    products(first: 50, query: \"product_type:Part OR product_type:Consumable\") {\n      nodes {\n        id\n        ...ProductCardFields\n      }\n    }\n  }\n": types.SparePartsAndConsumablesDocument,
    "\n  query DevicesAndKits {\n    products(first: 50, query: \"product_type:Device OR product_type:Kit\") {\n      nodes {\n        id\n        ...ProductCardFields\n      }\n    }\n  }\n": types.DevicesAndKitsDocument,
    "\n  mutation AddCartLineItem($cartId: ID!, $variantId: ID!, $quantity: Int) {\n    cartLinesAdd(\n      cartId: $cartId\n      lines: [{ quantity: $quantity, merchandiseId: $variantId }]\n    ) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n": types.AddCartLineItemDocument,
    "\n  mutation RemoveCartLineItem($cartId: ID!, $lineId: ID!) {\n    cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n": types.RemoveCartLineItemDocument,
    "\n  mutation UpdateCartLineItem($cartId: ID!, $lineId: ID!, $quantity: Int) {\n    cartLinesUpdate(\n      cartId: $cartId\n      lines: [{ id: $lineId, quantity: $quantity }]\n    ) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n": types.UpdateCartLineItemDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MetaobjectDetails on Metaobject {\n    id\n    handle\n    type\n    modelNumber: field(key: \"name\") {\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment MetaobjectDetails on Metaobject {\n    id\n    handle\n    type\n    modelNumber: field(key: \"name\") {\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RelatedDevices($modelFilters: [ProductFilter!]) {\n    collection(handle: \"all\") {\n      products(first: 20, filters: $modelFilters) {\n        nodes {\n          id\n          title\n          ...ProductCardFields\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query RelatedDevices($modelFilters: [ProductFilter!]) {\n    collection(handle: \"all\") {\n      products(first: 20, filters: $modelFilters) {\n        nodes {\n          id\n          title\n          ...ProductCardFields\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDevicesByModels($modelNumbers: [String!]!) {\n    products(first: 100, query: \"product_type:Device\") {\n      nodes {\n        id\n        title\n        handle\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDevicesByModels($modelNumbers: [String!]!) {\n    products(first: 100, query: \"product_type:Device\") {\n      nodes {\n        id\n        title\n        handle\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateNewCart {\n    cartCreate {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNewCart {\n    cartCreate {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    lines(first: 50) {\n      nodes {\n        id\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            selectedOptions {\n              name\n              value\n            }\n            sku\n            availableForSale\n            image {\n              url\n            }\n            product {\n              ...ProductCardFields\n            }\n          }\n        }\n        quantity\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CartFields on Cart {\n    id\n    checkoutUrl\n    lines(first: 50) {\n      nodes {\n        id\n        merchandise {\n          ... on ProductVariant {\n            id\n            title\n            selectedOptions {\n              name\n              value\n            }\n            sku\n            availableForSale\n            image {\n              url\n            }\n            product {\n              ...ProductCardFields\n            }\n          }\n        }\n        quantity\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartFields\n    }\n  }\n"): (typeof documents)["\n  query GetCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PredictiveSearch($search: String!) {\n    predictiveSearch(query: $search, types: [PRODUCT, QUERY], limit: 5) {\n      products {\n        ...ProductCardFields\n      }\n      queries {\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  query PredictiveSearch($search: String!) {\n    predictiveSearch(query: $search, types: [PRODUCT, QUERY], limit: 5) {\n      products {\n        ...ProductCardFields\n      }\n      queries {\n        text\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchProducts($search: String!) {\n    search(first: 50, query: $search, sortKey: RELEVANCE) {\n      nodes {\n        ... on Product {\n          id\n          ...ProductCardFields\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchProducts($search: String!) {\n    search(first: 50, query: $search, sortKey: RELEVANCE) {\n      nodes {\n        ... on Product {\n          id\n          ...ProductCardFields\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductCardFields on Product {\n    id\n    title\n    handle\n    description\n    productType\n    availableForSale\n    priceRange {\n      minVariantPrice {\n        amount\n      }\n      maxVariantPrice {\n        amount\n      }\n    }\n    tags\n    totalInventory\n    variants(first: 50) {\n      nodes {\n        id\n        title\n        price {\n          amount\n        }\n        availableForSale\n        quantityAvailable\n        sku\n      }\n    }\n    images(first: 5) {\n      nodes {\n        id\n        url\n      }\n    }\n    related_products: metafields(\n      identifiers: [{ namespace: \"custom\", key: \"related_products\" }]\n    ) {\n      references(first: 50) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            id\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n    models: metafields(identifiers: [{ namespace: \"custom\", key: \"models\" }]) {\n      references(first: 50) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            id\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductCardFields on Product {\n    id\n    title\n    handle\n    description\n    productType\n    availableForSale\n    priceRange {\n      minVariantPrice {\n        amount\n      }\n      maxVariantPrice {\n        amount\n      }\n    }\n    tags\n    totalInventory\n    variants(first: 50) {\n      nodes {\n        id\n        title\n        price {\n          amount\n        }\n        availableForSale\n        quantityAvailable\n        sku\n      }\n    }\n    images(first: 5) {\n      nodes {\n        id\n        url\n      }\n    }\n    related_products: metafields(\n      identifiers: [{ namespace: \"custom\", key: \"related_products\" }]\n    ) {\n      references(first: 50) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            id\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n    models: metafields(identifiers: [{ namespace: \"custom\", key: \"models\" }]) {\n      references(first: 50) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            id\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductById($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      ...ProductCardFields\n    }\n  }\n"): (typeof documents)["\n  query ProductById($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      ...ProductCardFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRelatedDevices($searchQuery: String!) {\n    products(first: 50, query: $searchQuery) {\n      nodes {\n        id\n        title\n        ...ProductCardFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRelatedDevices($searchQuery: String!) {\n    products(first: 50, query: $searchQuery) {\n      nodes {\n        id\n        title\n        ...ProductCardFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SparePartsAndConsumables {\n    products(first: 50, query: \"product_type:Part OR product_type:Consumable\") {\n      nodes {\n        id\n        ...ProductCardFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query SparePartsAndConsumables {\n    products(first: 50, query: \"product_type:Part OR product_type:Consumable\") {\n      nodes {\n        id\n        ...ProductCardFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DevicesAndKits {\n    products(first: 50, query: \"product_type:Device OR product_type:Kit\") {\n      nodes {\n        id\n        ...ProductCardFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query DevicesAndKits {\n    products(first: 50, query: \"product_type:Device OR product_type:Kit\") {\n      nodes {\n        id\n        ...ProductCardFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddCartLineItem($cartId: ID!, $variantId: ID!, $quantity: Int) {\n    cartLinesAdd(\n      cartId: $cartId\n      lines: [{ quantity: $quantity, merchandiseId: $variantId }]\n    ) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddCartLineItem($cartId: ID!, $variantId: ID!, $quantity: Int) {\n    cartLinesAdd(\n      cartId: $cartId\n      lines: [{ quantity: $quantity, merchandiseId: $variantId }]\n    ) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCartLineItem($cartId: ID!, $lineId: ID!) {\n    cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCartLineItem($cartId: ID!, $lineId: ID!) {\n    cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCartLineItem($cartId: ID!, $lineId: ID!, $quantity: Int) {\n    cartLinesUpdate(\n      cartId: $cartId\n      lines: [{ id: $lineId, quantity: $quantity }]\n    ) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCartLineItem($cartId: ID!, $lineId: ID!, $quantity: Int) {\n    cartLinesUpdate(\n      cartId: $cartId\n      lines: [{ id: $lineId, quantity: $quantity }]\n    ) {\n      cart {\n        ...CartFields\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;