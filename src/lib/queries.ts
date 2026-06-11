import { graphql } from "@/types/gql";

export const CreateNewCartQuery = graphql(/* gql */ `
  mutation CreateNewCart {
    cartCreate {
      cart {
        ...CartFields
      }
    }
  }
`);
export const CartFields = graphql(/* gql */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    lines(first: 50) {
      nodes {
        id
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions {
              name
              value
            }
            sku
            availableForSale
            image {
              url
            }
            product {
              ...ProductCardFields
            }
          }
        }
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`);
export const GetCartQuery = graphql(/* gql */ `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`);

export const PredictiveSearchQuery = graphql(/* gql */ `
  query PredictiveSearch($search: String!) {
    predictiveSearch(query: $search, types: [PRODUCT, QUERY], limit: 5) {
      products {
        ...ProductCardFields
      }
      queries {
        text
      }
    }
  }
`);

export const SearchProductsQuery = graphql(/* gql */ `
  query SearchProducts($search: String!) {
    search(first: 50, query: $search, sortKey: RELEVANCE) {
      nodes {
        ... on Product {
          id
          ...ProductCardFields
        }
      }
    }
  }
`);
export const ProductCardFields = graphql(/* gql */ `
  fragment ProductCardFields on Product {
    id
    title
    handle
    description
    productType
    availableForSale
    priceRange {
      minVariantPrice {
        amount
      }
      maxVariantPrice {
        amount
      }
    }
    tags
    totalInventory
    variants(first: 50) {
      nodes {
        id
        title
        price {
          amount
        }
        availableForSale
        quantityAvailable
        sku
      }
    }
    images(first: 5) {
      nodes {
        id
        url
      }
    }
    related_products: metafields(
      identifiers: [{ namespace: "custom", key: "related_products" }]
    ) {
      references(first: 50) {
        nodes {
          __typename
          ... on Metaobject {
            id
            ...MetaobjectDetails
          }
        }
      }
    }
    models: metafields(identifiers: [{ namespace: "custom", key: "models" }]) {
      references(first: 50) {
        nodes {
          __typename
          ... on Metaobject {
            id
            ...MetaobjectDetails
          }
        }
      }
    }
  }
`);
export const GetProductByIdQuery = graphql(/* gql */ `
  query ProductById($handle: String!) {
    product(handle: $handle) {
      id
      title
      ...ProductCardFields
    }
  }
`);

export const GetRelatedDevicesQuery = graphql(/* gql */ `
  query GetRelatedDevices($searchQuery: String!) {
    products(first: 50, query: $searchQuery) {
      nodes {
        id
        title
        ...ProductCardFields
      }
    }
  }
`);
export const SparePartsAndConsumablesQuery = graphql(/* gql */ `
  query SparePartsAndConsumables {
    products(first: 50, query: "product_type:Part OR product_type:Consumable") {
      nodes {
        id
        ...ProductCardFields
      }
    }
  }
`);

export const DevicesAndKitsQuery = graphql(/* gql */ `
  query DevicesAndKits {
    products(first: 50, query: "product_type:Device OR product_type:Kit") {
      nodes {
        id
        ...ProductCardFields
      }
    }
  }
`);

export const AddCartLineItemQuery = graphql(/* gql */ `
  mutation AddCartLineItem($cartId: ID!, $variantId: ID!, $quantity: Int) {
    cartLinesAdd(
      cartId: $cartId
      lines: [{ quantity: $quantity, merchandiseId: $variantId }]
    ) {
      cart {
        ...CartFields
      }
    }
  }
`);

export const RemoveCartLineItemQuery = graphql(/* gql */ `
  mutation RemoveCartLineItem($cartId: ID!, $lineId: ID!) {
    cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {
      cart {
        ...CartFields
      }
    }
  }
`);

export const UpdateCartLineItemQuery = graphql(/* gql */ `
  mutation UpdateCartLineItem($cartId: ID!, $lineId: ID!, $quantity: Int) {
    cartLinesUpdate(
      cartId: $cartId
      lines: [{ id: $lineId, quantity: $quantity }]
    ) {
      cart {
        ...CartFields
      }
    }
  }
`);
