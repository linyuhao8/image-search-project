import { useState } from "react";

const usePagination = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [usedPageNumbers, setUsedPageNumbers] = useState([]);

  // 生成隨機頁數 (1-500)
  const generateRandomPage = () => Math.floor(Math.random() * 500);

  // 設定新頁數
  const setNewPage = (newPage) => {
    setPageNumber(newPage);
    setUsedPageNumbers((prev) => [...prev, newPage]);
  };

  // 下一頁
  const nextPage = () => {
    setNewPage(pageNumber + 1);
  };

  return {
    pageNumber,
    usedPageNumbers,
    generateRandomPage,
    setNewPage,
    nextPage,
  };
};

export default usePagination;
