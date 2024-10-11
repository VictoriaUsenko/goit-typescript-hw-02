import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

import { ImageGalleryProps } from "./ImageGallery.type";

export default function ImageGallery({ photos, onOpen }: ImageGalleryProps) {
  return (
    <ul className={css.ul}>
      {photos.map((photo) => (
        <li key={photo.id} className={css.li}>
          <ImageCard photo={photo} modal={false} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}
