import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AboutUsSection from "./AboutUsSection";
import MerchSection from "./MerchSection";
import { IContentfull, ICartItemProps } from "../types";

const App: React.FC<IContentfull> = ({ abouUstContent, catalougeContent }) => {
  const [items, setItems] = useState<Array<ICartItemProps>>([]);

  useEffect(() => {
    const localStorageList = localStorage.getItem("itemsList") || "[]";
    const itemsList = JSON.parse(localStorageList);
    setItems(itemsList);
  }, []);

  return (
    <>
      <Navbar items={items} />
      <AboutUsSection
        aboutUsTitle={abouUstContent.aboutUsTitle}
        aboutUsImage={abouUstContent.aboutUsImage}
        aboutUsDescription={abouUstContent.aboutUsDescription}
      />
      <MerchSection merchContent={catalougeContent} setItems={setItems} />
    </>
  );
};

export default App;
