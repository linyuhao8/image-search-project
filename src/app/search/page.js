"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Next.js 13+ 用法
import Search from "@/components/searchComponent/Search";
import ImageGrid from "../../components/ImageGrid";

const SearchPage = () => {
  const [photos, setPhotos] = useState([]); // 用來存放圖片資料
  const [loading, setLoading] = useState(false); // 用來顯示 loading 狀態
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋關鍵字
  const [pageNumber, setPageNumber] = useState(0);
  const [usedPageNumbers, setUsedPageNumbers] = useState([]); // 用來儲存已使用的頁數
  const searchParams = useSearchParams(); // 用於獲取查詢參數
  const q = searchParams.get("q"); // 取得 'q' 參數
  const searchImg = async () => {
    setLoading(true); // 設置為 loading 狀態
    // 產生隨機頁數（1 到 500 之間）
    const generateRandomPage = () => {
      return Math.floor(Math.random() * 500);
    };
    try {
      let currentPage = pageNumber; // 預設為當前頁數
      if (firstLoad) {
        // 更新第一次加載狀態
        console.log("first");
        setSearchQuery(""); // 清空搜尋關鍵字
        const randomPage = generateRandomPage(); // 生成一個隨機頁碼
        setPageNumber(randomPage); // 設置頁數 初始為亂碼頁
        setUsedPageNumbers([randomPage]); // 重置已使用頁數，並加入第一個使用的頁碼
        setFirstLoad(false);
        currentPage = randomPage; // 直接使用這個新的亂數頁面
      }
      // 如果沒有搜尋關鍵字（隨機模式），會一直載入新圖片
      else if (!searchQuery) {
        console.log("觸發無關鍵字隨機");
        let newRandomPage;
        do {
          newRandomPage = generateRandomPage(); // 產生新的隨機頁碼
        } while (usedPageNumbers.includes(newRandomPage)); // 確保隨機頁數未被使用過

        setPageNumber(newRandomPage); // 更新頁數
        setUsedPageNumbers((prev) => [...prev, newRandomPage]); // 記錄已使用的頁數
        currentPage = newRandomPage;
      }
      // 如果有搜尋關鍵字
      // 1.第一次搜尋圖片，直接重新刷新，跳到有關鍵字和page的網址
      // 2.在已經搜尋過的關鍵字繼續載入圖片，也就是page++
      else {
        // **這裡直接跳轉到新網址**
        console.log("Search Query before redirect:", searchQuery);
        if (searchQuery) {
          window.location.href = `/search/?q=${encodeURIComponent(
            searchQuery
          )}`;
        }
        return; // 這裡加入 return 來確保後續程式不會繼續執行
      }

      console.log("Page Number:", currentPage); // 輸出頁數

      const result = await axios.get("http://localhost:5001/random", {
        params: { page: currentPage },
      });

      console.log("API response:", result.data); // 確認 API 回傳的資料

      // 如果是第一次加載，將圖片列表重新設置；否則，繼續追加圖片
      setPhotos((prevPhotos) =>
        firstLoad ? result.data.photos : [...prevPhotos, ...result.data.photos]
      );
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); // 不管成功或失敗都要關閉 loading 狀態
    }
  };
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

  // 監聽輸入變化
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };
  // 只有在 q 或 page 改變時才執行搜尋
  useEffect(() => {
    getSearchResults();
  }, []); // 依賴 q 和 page

  return (
    <>
      <div>
        <Search
          search={searchImg}
          searchQuery={searchQuery}
          onInputChange={handleSearchInput}
        />
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-800">
          {loading && firstLoad ? (
            <div className="flex flex-col items-center mt-10">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading images...</p>
            </div>
          ) : (
            <>
              <ImageGrid photos={photos} />
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
