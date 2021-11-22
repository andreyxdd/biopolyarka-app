import type { NextPage } from "next";
// import Head from "next/head";
// import styles from "../styles/Home.module.css";
import React from "react";
import {
  getContentfulAboutData,
  getContentfulCollectionData,
} from "../lib/api";
import App from "../components/App";
import { IContentfull } from "../types";

/**
 * Get server side properties from the contentful API
 */
export async function getStaticProps() {
  const aboutContent = await getContentfulAboutData();
  const collectionContent = await getContentfulCollectionData();

  console.log(aboutContent);
  console.log(collectionContent);

  return {
    props: {
      aboutContent,
      collectionContent,
    },
    revalidate: 10,
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
