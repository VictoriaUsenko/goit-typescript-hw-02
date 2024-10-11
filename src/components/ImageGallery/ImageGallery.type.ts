import { ITransformData } from "./../../helpers/helpers";

export type ImageGalleryProps = {
  photos: ITransformData[];
  onOpen: (arg: ITransformData) => void;
};
