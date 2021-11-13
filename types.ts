import { IAboutFields, IRing } from "./@types/generated/contentful";

export interface IContentfull {
  abouUstContent: IAboutFields;
  catalougeContent: Array<IRing>;
}

export interface ICartItemProps {
  title: string;
  price: number;
}
