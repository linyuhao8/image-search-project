"use client";
import Hero from "../components/hero/Hero";
import ImageGrid from "../components/ImageGrid";
import { useEffect, Suspense } from "react";
import useRandomImages from "@/hooks/useRandomImage";
import useSearchImage from "@/hooks/useSearchImage";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSearchParams } from "next/navigation";

const HomeContent = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const { photos, loading, firstLoad, fetchRandomImages } = useRandomImages();
  const { searchQuery, handleSearchInput, handleSearchSubmit } = useSearchImage(
    { q }
  );

  // 頁面載入時自動執行隨機圖片獲取
  useEffect(() => {
    fetchRandomImages(); // 使用 fetchRandomImages 函式來取得隨機圖片
  }, []); // 只會在首次載入時執行一次
  useInfiniteScroll(fetchRandomImages, loading);

  return (
    <div>
      <Hero
        searchQuery={searchQuery}
        onInputChange={handleSearchInput}
        search={handleSearchSubmit}
      />
      <div className="flex flex-col items-center justify-start bg-gray-800">
        {firstLoad && loading ? (
          <div className="flex flex-col items-center mt-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading images...</p>
          </div>
        ) : (
          <>
            <ImageGrid photos={photos} />
          </>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;
