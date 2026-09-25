import { graphql, useFragment, type FragmentType } from "@/types/gql";
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
