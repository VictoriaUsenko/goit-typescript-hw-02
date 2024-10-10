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

ReactModal.setAppElement("#root");

export default function App() {
  const [photos, setPhotos] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  type Modal = {
    isOpen: boolean;
    photo: null | null;
  };

  type Query = {
    query: string;
    page: number;
  };

  const [showModal, setShowModal] = useState<Modal>({
    isOpen: false,
    photo: null,
  });

  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const updateQuery = (queryString: string): void => {
    setPage(1);
    setQuery(queryString);
  };

  useEffect(() => {
    makeRequest(query, page);
  }, [query, page]);

  const makeRequest = (query, page) => {
    if (query) {
      setLoading(true);
      setError(false);

      fetchPhotos(query, page)
        .then((data) => {
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

  const openImage = (photo) => {
    setShowModal({ isOpen: true, photo });
  };

  const closeImage = () => {
    setShowModal({ isOpen: false, photo: null });
  };

  return (
    <>
      <SearchBar onSubmit={updateQuery} />
      {error && <ErrorMessage />}
      {photos.length > 0 && !error && (
        <ImageGallery photos={photos} onOpen={openImage} />
      )}
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
      {photos.length > 0 && !error && (
        <LoadMoreBtn onLoading={loading} setPage={setPage} />
      )}
      <Toaster />
      <ImageModal showModal={showModal} closeModal={closeImage} />
    </>
  );
}
