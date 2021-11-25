import React from "react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import CollectionSection from "./CollectionSection";
import CheckoutSection from "./CheckoutSection";
import { IContentfull } from "../types";
import AppContextProvider from "../context/AppContextProvider";
import Footer from "./Footer";
import { SnackbarProvider } from "notistack";

const App: React.FC<IContentfull> = ({
  aboutContent,
  collectionContent,
  ringContent,
  checkoutContent,
}) => {
  return (
    <AppContextProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        maxSnack={3}
      >
        <Navbar
          navbarTitle={aboutContent.navbarTitle}
          aboutLinkTitle={aboutContent.title}
          collectionLinkTitle={collectionContent.title}
          checkoutLinkTitle={checkoutContent.title}
        />
        <AboutSection aboutContent={aboutContent} />
        <CollectionSection
          collectionContent={collectionContent}
          ringContent={ringContent}
        />
        <CheckoutSection checkoutContent={checkoutContent} />
        <Footer navbarTitle={aboutContent.navbarTitle} />
      </SnackbarProvider>
    </AppContextProvider>
  );
};

export default App;
