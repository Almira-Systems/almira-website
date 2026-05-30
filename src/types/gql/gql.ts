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
    "\n  query SparePartsAndConsumables {\n    products(first: 50, query: \"product_type:Part OR product_type:Consumable\") {\n      edges {\n        node {\n          id\n          ...ProductCardFields\n          for_device_models: metafields(\n            identifiers: [{ namespace: \"custom\", key: \"models\" }]\n          ) {\n            references(first: 10) {\n              edges {\n                node {\n                  __typename\n                  ... on Metaobject {\n                    id\n                    model_number: field(key: \"name\") {\n                      value\n                    }\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.SparePartsAndConsumablesDocument,
    "\n  query DevicesAndKits {\n    products(first: 50, query: \"product_type:Device OR product_type:Kit\") {\n      edges {\n        node {\n          id\n          ...ProductCardFields\n          models: metafields(\n            identifiers: [{ namespace: \"custom\", key: \"models\" }]\n          ) {\n            references(first: 10) {\n              edges {\n                node {\n                  __typename\n                  ... on Metaobject {\n                    id\n                    model_number: field(key: \"name\") {\n                      value\n                    }\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.DevicesAndKitsDocument,
    "\n  query ProductById($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      ...ProductCardFields\n    }\n  }\n": typeof types.ProductByIdDocument,
    "\n  query RelatedDevices($searchQuery: String!) {\n    products(first: 12, query: $searchQuery) {\n      nodes {\n        id\n        title\n        ...ProductCardFields\n      }\n    }\n  }\n": typeof types.RelatedDevicesDocument,
    "\n  fragment ProductCardFields on Product {\n    id\n    title\n    handle\n    description\n    productType\n    images(first: 5) {\n      nodes {\n        id\n        url\n      }\n    }\n    for_device_models: metafields(\n      identifiers: [{ namespace: \"custom\", key: \"models\" }]\n    ) {\n      references(first: 10) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProductCardFieldsFragmentDoc,
    "\n  fragment MetaobjectDetails on Metaobject {\n    id\n    handle\n    type\n    modelNumber: field(key: \"name\") {\n      value\n    }\n  }\n": typeof types.MetaobjectDetailsFragmentDoc,
};
const documents: Documents = {
    "\n  query SparePartsAndConsumables {\n    products(first: 50, query: \"product_type:Part OR product_type:Consumable\") {\n      edges {\n        node {\n          id\n          ...ProductCardFields\n          for_device_models: metafields(\n            identifiers: [{ namespace: \"custom\", key: \"models\" }]\n          ) {\n            references(first: 10) {\n              edges {\n                node {\n                  __typename\n                  ... on Metaobject {\n                    id\n                    model_number: field(key: \"name\") {\n                      value\n                    }\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.SparePartsAndConsumablesDocument,
    "\n  query DevicesAndKits {\n    products(first: 50, query: \"product_type:Device OR product_type:Kit\") {\n      edges {\n        node {\n          id\n          ...ProductCardFields\n          models: metafields(\n            identifiers: [{ namespace: \"custom\", key: \"models\" }]\n          ) {\n            references(first: 10) {\n              edges {\n                node {\n                  __typename\n                  ... on Metaobject {\n                    id\n                    model_number: field(key: \"name\") {\n                      value\n                    }\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.DevicesAndKitsDocument,
    "\n  query ProductById($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      ...ProductCardFields\n    }\n  }\n": types.ProductByIdDocument,
    "\n  query RelatedDevices($searchQuery: String!) {\n    products(first: 12, query: $searchQuery) {\n      nodes {\n        id\n        title\n        ...ProductCardFields\n      }\n    }\n  }\n": types.RelatedDevicesDocument,
    "\n  fragment ProductCardFields on Product {\n    id\n    title\n    handle\n    description\n    productType\n    images(first: 5) {\n      nodes {\n        id\n        url\n      }\n    }\n    for_device_models: metafields(\n      identifiers: [{ namespace: \"custom\", key: \"models\" }]\n    ) {\n      references(first: 10) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n  }\n": types.ProductCardFieldsFragmentDoc,
    "\n  fragment MetaobjectDetails on Metaobject {\n    id\n    handle\n    type\n    modelNumber: field(key: \"name\") {\n      value\n    }\n  }\n": types.MetaobjectDetailsFragmentDoc,
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
export function graphql(source: "\n  query SparePartsAndConsumables {\n    products(first: 50, query: \"product_type:Part OR product_type:Consumable\") {\n      edges {\n        node {\n          id\n          ...ProductCardFields\n          for_device_models: metafields(\n            identifiers: [{ namespace: \"custom\", key: \"models\" }]\n          ) {\n            references(first: 10) {\n              edges {\n                node {\n                  __typename\n                  ... on Metaobject {\n                    id\n                    model_number: field(key: \"name\") {\n                      value\n                    }\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SparePartsAndConsumables {\n    products(first: 50, query: \"product_type:Part OR product_type:Consumable\") {\n      edges {\n        node {\n          id\n          ...ProductCardFields\n          for_device_models: metafields(\n            identifiers: [{ namespace: \"custom\", key: \"models\" }]\n          ) {\n            references(first: 10) {\n              edges {\n                node {\n                  __typename\n                  ... on Metaobject {\n                    id\n                    model_number: field(key: \"name\") {\n                      value\n                    }\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DevicesAndKits {\n    products(first: 50, query: \"product_type:Device OR product_type:Kit\") {\n      edges {\n        node {\n          id\n          ...ProductCardFields\n          models: metafields(\n            identifiers: [{ namespace: \"custom\", key: \"models\" }]\n          ) {\n            references(first: 10) {\n              edges {\n                node {\n                  __typename\n                  ... on Metaobject {\n                    id\n                    model_number: field(key: \"name\") {\n                      value\n                    }\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DevicesAndKits {\n    products(first: 50, query: \"product_type:Device OR product_type:Kit\") {\n      edges {\n        node {\n          id\n          ...ProductCardFields\n          models: metafields(\n            identifiers: [{ namespace: \"custom\", key: \"models\" }]\n          ) {\n            references(first: 10) {\n              edges {\n                node {\n                  __typename\n                  ... on Metaobject {\n                    id\n                    model_number: field(key: \"name\") {\n                      value\n                    }\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductById($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      ...ProductCardFields\n    }\n  }\n"): (typeof documents)["\n  query ProductById($handle: String!) {\n    product(handle: $handle) {\n      id\n      title\n      ...ProductCardFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RelatedDevices($searchQuery: String!) {\n    products(first: 12, query: $searchQuery) {\n      nodes {\n        id\n        title\n        ...ProductCardFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query RelatedDevices($searchQuery: String!) {\n    products(first: 12, query: $searchQuery) {\n      nodes {\n        id\n        title\n        ...ProductCardFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductCardFields on Product {\n    id\n    title\n    handle\n    description\n    productType\n    images(first: 5) {\n      nodes {\n        id\n        url\n      }\n    }\n    for_device_models: metafields(\n      identifiers: [{ namespace: \"custom\", key: \"models\" }]\n    ) {\n      references(first: 10) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductCardFields on Product {\n    id\n    title\n    handle\n    description\n    productType\n    images(first: 5) {\n      nodes {\n        id\n        url\n      }\n    }\n    for_device_models: metafields(\n      identifiers: [{ namespace: \"custom\", key: \"models\" }]\n    ) {\n      references(first: 10) {\n        nodes {\n          __typename\n          ... on Metaobject {\n            ...MetaobjectDetails\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MetaobjectDetails on Metaobject {\n    id\n    handle\n    type\n    modelNumber: field(key: \"name\") {\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment MetaobjectDetails on Metaobject {\n    id\n    handle\n    type\n    modelNumber: field(key: \"name\") {\n      value\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;