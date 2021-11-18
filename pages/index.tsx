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

  const aboutContent = (
    await client.getEntry(process.env.CONTENTFUL_ABOUT_ENTRY_ID as string)
  ).fields;

  const catalougeContent = (await client.getEntries({ content_type: "ring" }))
    .items;

  return {
    props: {
      aboutContent,
      catalougeContent,
    },
  };
}

/**
 * This is the home page.
 * @return {JSX.Element}
 */
const Home: NextPage<IContentfull> = ({
  aboutContent,
  catalougeContent,
}): JSX.Element => {
  return (
    <App aboutContent={aboutContent} catalougeContent={catalougeContent} />
  );
};

export default Home;
