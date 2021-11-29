import { createClient } from "contentful";

/**
 * This function returns data from the ContentfulAPI model
 * @return {Object}
 */
export async function getContentfuData() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const aboutContent = await client.getEntry(
    process.env.CONTENTFUL_ABOUT_ENTRY_ID as string
  );
  const collectionContent = await client.getEntry(
    process.env.CONTENTFUL_COLLECTION_ENTRY_ID as string
  );
  const ringContent = await client.getEntries({
    content_type: "ring",
  });
  const checkoutContent = await client.getEntry(
    process.env.CONTENTFUL_CHECKOUT_ENTRY_ID as string
  );

  return {
    aboutContent: aboutContent.fields,
    collectionContent: collectionContent.fields,
    ringContent: ringContent.items,
    checkoutContent: checkoutContent.fields,
  };
}
