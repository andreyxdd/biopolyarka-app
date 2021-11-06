import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import EmotionButton from "../components/EmotionButton";
import StyledEmotionButton from "../components/StyledEmotionButton";

/**
 * This is the home page.
 * @returns {JSX.Element}
 */

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <EmotionButton />
      <StyledEmotionButton />
    </div>
  );
};

export default Home;
