import type { NextPage } from "next";
// import Head from "next/head";
// import styles from "../styles/Home.module.css";
import React from "react";
import { createClient } from "contentful";
import App from "../components/App";
import { IContentfull } from "../types";

/**
 * Get static properties from the contentful API
 */
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const abouUstContent = (
    await client.getEntry(process.env.CONTENTFUL_ABOUTUS_ENTRY_ID as string)
  ).fields;

  const catalougeContent = (await client.getEntries({ content_type: "ring" }))
    .items;

  return {
    props: {
      abouUstContent,
      catalougeContent,
    },
  };
}

/**
 * This is the home page.
 * @return {JSX.Element}
 */
const Home: NextPage<IContentfull> = ({
  abouUstContent,
  catalougeContent,
}): JSX.Element => {
  return (
    <App abouUstContent={abouUstContent} catalougeContent={catalougeContent} />
  );
};

export default Home;
