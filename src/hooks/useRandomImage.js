import { useState } from "react";
import axios from "axios";
import usePagination from "./usePagination";

const useRandomImages = () => {
  const { pageNumber, usedPageNumbers, generateRandomPage, setNewPage } =
    usePagination();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const fetchRandomImages = async () => {
    setLoading(true);
    try {
      let currentPage = pageNumber;

      if (firstLoad) {
        const randomPage = generateRandomPage();
        setNewPage(randomPage);
        currentPage = randomPage;
      } else {
        let newRandomPage;
        do {
          newRandomPage = generateRandomPage();
        } while (usedPageNumbers.includes(newRandomPage));
        setNewPage(newRandomPage);
        currentPage = newRandomPage;
      }

      const result = await axios.get("http://localhost:5001/random", {
        params: { page: currentPage },
      });
      setFirstLoad(false);
      setPhotos((prevPhotos) =>
        firstLoad ? result.data.photos : [...prevPhotos, ...result.data.photos]
      );
    } catch (error) {
      console.error("Error fetching random images:", error);
    } finally {
      setLoading(false);
    }
  };

  return { photos, loading, fetchRandomImages, firstLoad };
};

export default useRandomImages;
