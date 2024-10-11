import { ITransformData } from "../../helpers/helpers";

export type Modal = {
  isOpen: boolean;
  photo?: ITransformData | null;
};

export type Query = {
  query: string | null;
  page: number;
};
