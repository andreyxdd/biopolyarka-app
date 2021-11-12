import type { NextPage } from "next";
// import Head from "next/head";
// import styles from "../styles/Home.module.css";
import React from "react";
import { createClient } from "contentful";
import PropTypes from "prop-types";

import Navbar from "../components/Navbar";
import AboutUsSection from "../components/AboutUsSection";
import MerchSection from "../components/MerchSection";

/**
 * Get static properties from the contentful API
 */
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const abouUstContent = await client.getEntry(
    process.env.CONTENTFUL_ABOUTUS_ENTRY_ID as string
  );

  const catalougeContent = (
    await await client.getEntries({ content_type: "ring" })
  ).items;

  return {
    props: {
      abouUstContent,
      catalougeContent,
    },
  };
}

interface iStaticProps {
  abouUstContent: any;
  catalougeContent: Array<any>;
}

/**
 * This is the home page.
 * @return {JSX.Element}
 */
const Home: NextPage<iStaticProps> = ({
  abouUstContent,
  catalougeContent,
}): JSX.Element => {
  console.log(catalougeContent);

  return (
    <>
      <Navbar />
      <AboutUsSection abouUstContent={abouUstContent} />
      <MerchSection merchContent={catalougeContent} />
    </>
  );
};

Home.propTypes = {
  abouUstContent: PropTypes.object.isRequired,
  catalougeContent: PropTypes.array.isRequired,
};

export default Home;
