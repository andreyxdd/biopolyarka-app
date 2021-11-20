import React from "react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import CollectionSection from "./CollectionSection";
import CheckoutSection from "./CheckoutSection";
import { IContentfull } from "../types";
import AppContextProvider from "../context/AppContextProvider";
import Footer from "./Footer";

const App: React.FC<IContentfull> = ({ aboutContent, collectionContent }) => {
  return (
    <AppContextProvider>
      <Navbar navbarTitle={aboutContent.navbarTitle} />
      <AboutSection
        title={aboutContent.title}
        image={aboutContent.image}
        description={aboutContent.description}
      />
      <CollectionSection collectionContent={collectionContent} />
      <CheckoutSection />
      <Footer navbarTitle={aboutContent.navbarTitle} />
    </AppContextProvider>
  );
};

export default App;
