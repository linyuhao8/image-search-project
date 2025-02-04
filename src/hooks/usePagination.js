import { useState } from "react";

const usePagination = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [usedPageNumbers, setUsedPageNumbers] = useState([]);

  // 生成隨機頁數 (1-500)
  const generateRandomPage = () => Math.floor(Math.random() * 500);

  // 設定新頁數
  const setNewPage = (newPage) => {
    setPageNumber(newPage);
    setUsedPageNumbers((prev) => [...prev, newPage]);
  };

  return {
    pageNumber,
    setPageNumber,
    usedPageNumbers,
    setUsedPageNumbers,
    generateRandomPage,
    setNewPage,
  };
};

export default usePagination;
