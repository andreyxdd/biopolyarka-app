import { IAboutFields, IRing } from "./@types/generated/contentful";

export interface IContentfull {
  abouUstContent: IAboutFields;
  catalougeContent: Array<IRing>;
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
