import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

/**
 * This function returns the repond from the Contentful-api of "About" content model (only one entry)
 * @return {Object}
 */
export async function getContentfulAboutData() {
  const aboutContent = await client.getEntry(
    process.env.CONTENTFUL_ABOUT_ENTRY_ID as string
  );

  return aboutContent.fields;
}

/**
 * This function returns the repond from the Contentful-api of "Ring" content model (multiple entries)
 * @return {Object}
 */
export async function getContentfulCollectionData() {
  const collectionContent = await client.getEntries({ content_type: "ring" });

  return collectionContent.items;
}
