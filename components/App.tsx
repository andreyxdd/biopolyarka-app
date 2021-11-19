import React from "react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import CatalougeSection from "./CatalougeSection";
import CheckoutSection from "./CheckoutSection";
import { IContentfull } from "../types";
import AppContextProvider from "../context/AppContextProvider";
import Footer from "./Footer";

const App: React.FC<IContentfull> = ({ aboutContent, catalougeContent }) => {
  return (
    <AppContextProvider>
      <Navbar navbarTitle={aboutContent.navbarTitle} />
      <AboutSection
        title={aboutContent.title}
        image={aboutContent.image}
        description={aboutContent.description}
      />
      <CatalougeSection catalougeContent={catalougeContent} />
      <CheckoutSection />
      <Footer />
    </AppContextProvider>
  );
};

export default App;
