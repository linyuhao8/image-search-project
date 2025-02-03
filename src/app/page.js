"use client";
import Search from "../components/search/Search";
import ImageGrid from "../components/ImageGrid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false); // 新增 loading 狀態
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋關鍵字
  const [firstLoad, setFirstLoad] = useState(true);
  const [pageNumber, setPageNumber] = useState(null);
  const [usedPageNumbers, setUsedPageNumbers] = useState([]); // 用來儲存已使用的頁數
  const [prevSearchQuery, setPrevSearchQuery] = useState("");

  // 產生隨機頁數（1 到 500 之間）
  const generateRandomPage = () => {
    return Math.floor(Math.random() * 500);
  };

  const searchImg = async () => {
    setLoading(true); // 設置為 loading 狀態

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

  // 頁面載入時自動執行搜尋
  useEffect(() => {
    searchImg();
  }, []); // 這樣只會在首次載入時執行一次

  // 監聽輸入變化
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
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
              type="button" // 設定為 button 類型
              className="flex-none rounded-md grow-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 bg-indigo-400"
              onClick={searchImg} // 這裡綁定按鈕點擊事件
            >
              Load more
            </button>
          </>
        )}
      </div>
    </div>
  );
}
