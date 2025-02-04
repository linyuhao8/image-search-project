import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import usePagination from "./usePagination";

const useSearch = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const { pageNumber, nextPage } = usePagination();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(q || "");
  const [firstLoad, setFirstLoad] = useState(true);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
    console.log("觸發");
  };

  const handleSearchSubmit = () => {
    window.location.href = `/search/?q=${encodeURIComponent(searchQuery)}`;
  };

  const fetchSearchResults = async () => {
    if (!q) return;
    setLoading(true);

    try {
      nextPage();

      const result = await axios.get("http://localhost:5001/search", {
        params: { q: q, page: pageNumber },
      });
      setFirstLoad(false);
      setPhotos((prevPhotos) =>
        firstLoad ? result.data.photos : [...prevPhotos, ...result.data.photos]
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    photos,
    loading,
    searchQuery,
    handleSearchInput,
    handleSearchSubmit,
    fetchSearchResults,
    firstLoad,
  };
};

export default useSearch;
