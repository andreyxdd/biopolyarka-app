import type { NextPage } from "next";
import React from "react";
import { getContentfuData } from "../lib/api";
import App from "../components/App";
import { IContentfull } from "../types";

/**
 * Get server side properties from the contentful API
 */
export async function getStaticProps() {
  const data = await getContentfuData();

  if (
    !data.aboutContent ||
    !data.collectionContent ||
    !data.ringContent ||
    !data.checkoutContent
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      aboutContent: data.aboutContent,
      collectionContent: data.collectionContent,
      ringContent: data.ringContent,
      checkoutContent: data.checkoutContent,
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
  ringContent,
  checkoutContent,
}): JSX.Element => {
  return (
    <App
      aboutContent={aboutContent}
      collectionContent={collectionContent}
      ringContent={ringContent}
      checkoutContent={checkoutContent}
    />
  );
};

export default Home;
