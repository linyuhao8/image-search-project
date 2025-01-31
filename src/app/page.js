"use client";
import Search from "../components/search/Search";
import ImageGrid from "../components/ImageGrid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false); // 新增 loading 狀態
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋關鍵字
  const [buttonText, setButtonText] = useState("搜尋隨機圖片"); // 初始按鈕文字

  const searchImg = async () => {
    setLoading(true); // 設置為 loading 狀態
    //模擬loading
    // await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const result = await axios.get("http://localhost:5001/api/photos", {
        params: { keyword: searchQuery },
      });
      console.log("API response:", result.data); // 確認 API 回傳的資料
      setPhotos(result.data.photos); // 確保這裡的 key 名稱符合 API 回應
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); // 不管成功或失敗都要關閉 loading 狀態
    }
  };
  // 頁面載入時自動執行搜尋
  useEffect(() => {
    searchImg();
  }, []);
  // 監聽輸入變化
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setButtonText(value ? "搜尋相關圖片" : "搜尋隨機圖片");
  };
  return (
    <div>
      <Search
        search={searchImg}
        searchQuery={searchQuery}
        onInputChange={handleSearchInput}
        buttonText={buttonText}
      />
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-800">
        {loading ? (
          <div className="flex flex-col items-center mt-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading images...</p>
          </div>
        ) : (
          <ImageGrid photos={photos} />
        )}
      </div>
    </div>
  );
}
