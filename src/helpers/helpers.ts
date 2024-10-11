export interface ITransformData {
  id: string;
  alt: string;
  description: string;
  likes: number;
  thumbImg: string;
  fullImg: string;
  author: string;
  created_at: string;
  //total_pages: number;
}

export interface UnsplashPhoto {
  id: string;
  alt_description: string | null;
  description: string | null;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  created_at: string;
  //total_pages: number;
}

export function transformData(data: UnsplashPhoto[]): ITransformData[] {
  const result = data.map((photo) => {
    return {
      id: photo.id,
      alt: photo.alt_description || ``,
      description: photo.description || ``,
      likes: photo.likes,
      thumbImg: photo.urls.small,
      fullImg: photo.urls.regular,
      author: photo.user.name,
      created_at: photo.created_at,
    };
  });

  return result;
}
