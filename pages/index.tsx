import type { NextPage } from "next";
// import Head from "next/head";
// import styles from "../styles/Home.module.css";
import React from "react";
import { createClient } from "contentful";
import App from "../components/App";
import { IContentfull } from "../types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

/**
 * Get server side properties from the contentful API
 */
export async function getStaticProps() {
  const aboutContent = (
    await client.getEntry(process.env.CONTENTFUL_ABOUT_ENTRY_ID as string)
  ).fields;

  const collectionContent = (await client.getEntries({ content_type: "ring" }))
    .items;

  if (!aboutContent || !collectionContent) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      aboutContent,
      collectionContent,
    },
    revalidate: 1,
  };
}

/**
 * This is the home page.
 * @return {JSX.Element}
 */
const Home: NextPage<IContentfull> = ({
  aboutContent,
  collectionContent,
}): JSX.Element => {
  return (
    <App aboutContent={aboutContent} collectionContent={collectionContent} />
  );
};

export default Home;
