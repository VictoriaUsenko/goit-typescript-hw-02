import axios from "axios";
import {
  ITransformData,
  transformData,
  UnsplashPhoto,
} from "../helpers/helpers";

const base = "https://api.unsplash.com";
const access_key = "ReSc8gZPg5PMi_TpnreELLOlSN3DLsiiQNPAMTv7VMk";

type ResponseData = {
  data: {
    results: UnsplashPhoto[];
    total: number;
    total_pages: number;
  };
  status: number;
  statusText: string;
};

export async function fetchPhotos(
  searchString: string,
  page: number
): Promise<ITransformData[]> {
  const response: ResponseData = await axios.get(`${base}/search/photos`, {
    params: {
      client_id: access_key,
      page,
      per_page: 12,
      query: searchString.toLowerCase(),
    },
  });
  return transformData(response.data.results);
}
