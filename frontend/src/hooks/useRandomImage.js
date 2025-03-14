import { useState, useEffect } from "react";
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
      let isFirstLoad = firstLoad;
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

      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/random`,
        {
          params: { page: currentPage },
        }
      );
      console.log(
        "Making request to:",
        `${process.env.NEXT_PUBLIC_API_URL}/random?page=${encodeURIComponent(
          currentPage
        )}`
      );
      setFirstLoad(false);
      setPhotos((prevPhotos) =>
        isFirstLoad
          ? result.data.photos
          : [...prevPhotos, ...result.data.photos]
      );
      if (isFirstLoad) {
        isFirstLoad = false;
      }
    } catch (error) {
      console.error("Error fetching random images:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Updated photos:", photos);
  }, [photos]);

  return { photos, loading, fetchRandomImages, firstLoad };
};

export default useRandomImages;
