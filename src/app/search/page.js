"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Next.js 13+ 用法
import Image from "next/image";
import Masonry from "react-masonry-css";

const SearchPage = () => {
  const [photos, setPhotos] = useState([]); // 用來存放圖片資料
  const [loading, setLoading] = useState(false); // 用來顯示 loading 狀態
  const [firstLoad, setFirstLoad] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [usedPageNumbers, setUsedPageNumbers] = useState([]); // 用來儲存已使用的頁數
  const searchParams = useSearchParams(); // 用於獲取查詢參數
  const q = searchParams.get("q"); // 取得 'q' 參數

  const getSearchResults = async () => {
    setLoading(true); // 設置為 loading 狀態
    if (!q) return; // 如果 q 或 page 缺少，則返回
    try {
      let currentPage = pageNumber; //預設為當前頁數

      if (usedPageNumbers) {
        setPageNumber((prevPage) => prevPage + 1); // 相同關鍵字，頁數加 1
        currentPage += 1;
        setFirstLoad(false);
      }
      console.log("firstload " + firstLoad);
      // 記錄已使用的頁碼
      setUsedPageNumbers((prevUsedPageNumbers) => [
        ...prevUsedPageNumbers,
        currentPage,
      ]);
      const result = await axios.get("http://localhost:5001/search", {
        params: { q: q, page: currentPage },
      });
      console.log(result.data.photos);
      setPhotos((prevPhotos) =>
        firstLoad ? result.data.photos : [...prevPhotos, ...result.data.photos]
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // 無論如何都要關閉 loading 狀態
    }
  };

  // 只有在 q 或 page 改變時才執行搜尋
  useEffect(() => {
    getSearchResults();
  }, []); // 依賴 q 和 page

  const breakpointColumnsObj = {
    default: 4, // 預設 5 列
    1400: 4,
    1100: 3, // 當螢幕寬度小於 1100px 時，顯示 4 列
    700: 2, // 當螢幕寬度小於 700px 時，顯示 3 列
    500: 2, // 當螢幕寬度小於 500px 時，顯示 2 列
  };
  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900">
        {loading && firstLoad ? (
          <div className="flex flex-col items-center mt-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-2 text-white text-5xl">Loading images...</p>
          </div>
        ) : (
          <>
            <div className="p-6 flex flex-col items-center">
              <h1 className="text-3xl font-extrabold text-white dark:text-black mb-8">
                Search Result for : {q}
              </h1>
              <Masonry
                breakpointCols={breakpointColumnsObj} // 設定響應式列數
                className="flex gap-4" // 可選，用來控制外部容器的樣式
                columnClassName="" // 每一列的間距
              >
                {photos.map((photo) => (
                  <div key={photo.id} className="mb-4">
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={photo.src.large}
                        width={photo.width}
                        height={photo.height}
                        alt={photo?.alt || "image"}
                        className="rounded-lg object-cover"
                        priority
                      />
                    </a>
                  </div>
                ))}
              </Masonry>

              <button
                type="button"
                onClick={getSearchResults}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500"
              >
                <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
                  Hover me
                </div>
                <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                  >
                    <path
                      d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
