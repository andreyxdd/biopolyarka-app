import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import React from "react";
// import EmotionButton from "../components/EmotionButton";
// import StyledEmotionButton from "../components/StyledEmotionButton";
import Navbar from "../components/Navbar";
import AboutUsSection from "../components/AboutUsSection";
import { createClient } from "contentful";
import PropTypes from "prop-types";

/**
 * Get static properties from the contentful API
 */
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const res = await client.getEntry("4vy9WdobKKxiItvCdbvgZF");

  return {
    props: {
      abouUstContent: res,
    },
  };
}

interface iStaticProps {
  abouUstContent: any;
}

/**
 * This is the home page.
 * @return {JSX.Element}
 */
const Home: NextPage<iStaticProps> = ({ abouUstContent }): JSX.Element => {
  return (
    <>
      <Navbar />
      <AboutUsSection abouUstContent={abouUstContent} />
    </>
  );
};

Home.propTypes = {
  abouUstContent: PropTypes.object.isRequired,
};

export default Home;
