import React, { useState, useEffect, createContext } from "react";
import { IAppContextProps, IItemProps } from "../types";

export const AppContext = createContext<IAppContextProps | null>(null);

interface IAppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<IAppContextProviderProps> = ({
  children,
}) => {
  const [activeNavLinkId, setActiveNavLinkId] = useState("");
  const [items, setItems] = useState<Array<IItemProps>>([]);

  useEffect(() => {
    const localStorageList = localStorage.getItem("itemsList") || "[]";
    const itemsList = JSON.parse(localStorageList);
    setItems(itemsList);
  }, []);

  const providerValue: IAppContextProps = {
    activeNavLinkId: activeNavLinkId,
    setActiveNavLinkId: setActiveNavLinkId,
    items: items,
    setItems: setItems,
  };

  return (
    <AppContext.Provider value={providerValue as IAppContextProps}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
