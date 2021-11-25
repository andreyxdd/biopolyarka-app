import {
  IAboutFields,
  ICollectionFields,
  IRing,
  ICheckoutFields,
} from "./@types/generated/contentful";

export interface IContentfull {
  aboutContent: IAboutFields;
  ringContent: Array<IRing>;
  collectionContent: ICollectionFields;
  checkoutContent: ICheckoutFields;
}

export interface IItemProps {
  title: string;
  price: number;
  id: string;
}
export interface IAppContextProps {
  activeNavLinkId: string;
  setActiveNavLinkId: React.Dispatch<React.SetStateAction<string>>;
  items: Array<IItemProps>;
  setItems: React.Dispatch<React.SetStateAction<Array<IItemProps>>>;
}
