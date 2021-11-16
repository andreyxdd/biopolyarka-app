import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { IAppContextProps } from "../types";

// hook to resolve types
export const useContextTypes = () => useContext(AppContext) as IAppContextProps;
