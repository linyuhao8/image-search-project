"use client";
import Search from "../components/Search";
import ImageGrid from "../components/ImageGrid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false); // 新增 loading 狀態

  const searchImg = async () => {
    setLoading(true); // 設置為 loading 狀態
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const result = await axios.get("http://localhost:5001/api/photos");
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
  return (
    <div>
      <Search search={searchImg} />
      <div className="flex flex-col items-center justify-start min-h-screen">
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
