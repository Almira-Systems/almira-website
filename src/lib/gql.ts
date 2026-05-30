import type { ProductCardFields } from "@/components/product";
import { graphql, useFragment, type FragmentType } from "@/types/gql";
import type { Product, ProductByIdQuery } from "@/types/gql/graphql";
export const MetaobjectFields = graphql(/* gql */ `
  fragment MetaobjectDetails on Metaobject {
    id
    handle
    type
    modelNumber: field(key: "name") {
      value
    }
  }
`);

export const parseMetaobject = (
  metaobject: { __typename: string } & FragmentType<typeof MetaobjectFields>,
) => {
  if (metaobject?.__typename === "Metaobject") {
    return useFragment(MetaobjectFields, metaobject);
  }
};

export const parseProductModels = (
  product: FragmentType<typeof ProductCardFields>,
) => {};
