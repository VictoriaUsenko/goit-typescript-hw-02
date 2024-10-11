import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MutatingDots as MutatingDotsLoader } from "react-loader-spinner";
import ReactModal from "react-modal";

import { fetchPhotos } from "../../api/unplash-api";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

import { ITransformData } from "../../helpers/helpers";
import { Modal, Query } from "./App.types";

ReactModal.setAppElement("#root");

export default function App() {
  const [photos, setPhotos] = useState<ITransformData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [showModal, setShowModal] = useState<Modal>({
    isOpen: false,
    photo: null,
  });

  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const updateQuery = (queryString: string | null): void => {
    setPage(1);
    setQuery(queryString);
  };

  useEffect(() => {
    makeRequest({ query, page });
  }, [query, page]);

  const makeRequest = ({ query, page }: Query) => {
    if (query) {
      setLoading(true);
      setError(false);

      fetchPhotos(query, page)
        .then((data: ITransformData[]) => {
          console.log(data);
          if (data.length === 0) {
            return toast.error("No results for your query!", {
              duration: 3500,
              position: "top-right",
            });
          }

          if (page > 1) {
            setPhotos((prevPhotos) => [...prevPhotos, ...data]);
          } else {
            setPhotos(data);
          }
        })
        .catch((e) => {
          setError(true);

          toast.error(e.message, {
            duration: 3000,
            position: "top-right",
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const openImage = (photo: ITransformData) => {
    setShowModal({ isOpen: true, photo });
  };

  const closeImage = () => {
    setShowModal({ isOpen: false, photo: null });
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={updateQuery} />
      {error && <ErrorMessage />}
      {photos.length > 0 && !error && (
        <ImageGallery photos={photos} onOpen={openImage} />
      )}
      {loading && (
        <MutatingDotsLoader
          visible={loading}
          height="130"
          width="130"
          color="#6d32f5"
          secondaryColor="#ee20f6"
          radius="15"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass="load-wrapper"
        />
      )}
      {photos.length > 0 && !error && (
        <LoadMoreBtn
          onLoading={loading}
          handleLoadMoreClick={handleLoadMoreClick}
        />
      )}
      <Toaster />
      <ImageModal showModal={showModal} closeModal={closeImage} />
    </>
  );
}
