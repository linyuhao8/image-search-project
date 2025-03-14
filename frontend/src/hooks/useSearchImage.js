import { useState, useEffect } from "react";
import axios from "axios";
import usePagination from "./usePagination";

const useSearchimage = ({ q }) => {
  const { pageNumber, setPageNumber, usedPageNumbers, setUsedPageNumbers } =
    usePagination();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(q || "");
  const [firstLoad, setFirstLoad] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search/?q=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = "/";
    }
  };

  const fetchSearchResults = async () => {
    if (!q) return;
    setLoading(true);

    try {
      setFirstLoad(false);
      setPageNumber((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setErrorMessage(
        "There was an error fetching the results. Please try again. error:" +
          error
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Updated photos:", photos);
  }, [photos]);
  // useEffect 監聽 pageNumber 更新
  useEffect(() => {
    if (pageNumber > 0) {
      // 只在 pageNumber 更新時請求
      const fetchData = async () => {
        try {
          const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/search`,
            {
              params: { q: q, page: pageNumber }, // 使用最新的 pageNumber
            }
          );
          console.log(
            "Making request to:",
            `${process.env.NEXT_PUBLIC_API_URL}?q=${encodeURIComponent(
              q
            )}&page=${encodeURIComponent(pageNumber)}`
          );
          let data = result.data.photos;
          if (data.length === 0) {
            console.log("搜尋關鍵字無效找不到東西。");
            setNoResults(true);
          } else {
            setPhotos((prevPhotos) =>
              firstLoad ? data : [...prevPhotos, ...data]
            );
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetchData();
    }
  }, [pageNumber]); // 監聽 pageNumber 改變並發送請求

  return {
    photos,
    loading,
    searchQuery,
    handleSearchInput,
    handleSearchSubmit,
    fetchSearchResults,
    firstLoad,
    errorMessage,
    noResults,
  };
};

export default useSearchimage;
