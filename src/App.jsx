import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import "./App.css";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("anime");
  const [perPage, setPerPage] = useState(14);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");
  const [page, setPage] = useState(1);
  const fetchImages = async () => {
    try {
      await axios
        .get(
          `https://pixabay.com/api/?key=44939348-3f04b448fa57077128add0e98&q=${query}&image_type=photo&pretty=true&per_page=${perPage}&orientation=horizontal&page=${page}`
        )
        .then((res) =>
          setTimeout(() => {
            setImages(res.data.hits);
            setIsLoading(false);
          }, 300)
        );
    } catch (error) {
      console.error(`Error fetching images in App.jsx - ${error.message}`);
      setIsLoading(false);
    }
  };
  const loadmore = async () => {
    try {
      await axios
        .get(
          `https://pixabay.com/api/?key=44939348-3f04b448fa57077128add0e98&q=${query}&image_type=photo&pretty=true&per_page=${page}&page=${page}`
        )
        .then((res) =>
          setTimeout(() => {
            setImages((prevState) => [...prevState, ...res.data.hits]);
            setIsLoading(false);
          }, 300)
        );
    } catch (error) {
      console.error(`Error fetching images in App.jsx - ${error.message}`);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [query, isLoading]);

  useEffect(() => {
    loadmore();
  }, [page]);

  const handleQuery = (data) => {
    setQuery(data);
  };

  const handelModal = (img) => {
    setShowModal(!showModal);
    setImg(img);
  };
  const handelClose = () => {
    setShowModal(false);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  return (
    <main className="App">
      <Searchbar handleQuery={handleQuery} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ImageGallery handelModal={handelModal} images={images} />
          <Button handleLoadMore={handleLoadMore} />
        </>
      )}
      {showModal && <Modal img={img} handelClose={handelClose} />}
    </main>
  );
};

export default App;
