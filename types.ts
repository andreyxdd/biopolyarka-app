import { IAboutFields, IRing } from "./@types/generated/contentful";

export interface IContentfull {
  abouUstContent: IAboutFields;
  catalougeContent: Array<IRing>;
}

export interface ICartItemProps {
  title: string;
  price: number;
}
export interface IAppContextProps {
  activeNavLinkId: string;
  setActiveNavLinkId: React.Dispatch<React.SetStateAction<string>>;
  items: Array<ICartItemProps>;
  setItems: React.Dispatch<React.SetStateAction<Array<ICartItemProps>>>;
}
