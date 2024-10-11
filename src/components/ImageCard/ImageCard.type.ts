import { ITransformData } from "../../helpers/helpers";

export type ImageCardProps = {
  photo: ITransformData;
  modal: boolean;
  onOpen: (arg: ITransformData) => void;
};
