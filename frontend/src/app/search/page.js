"use client";

import React, { useEffect, Suspense } from "react";
import Hero from "@/components/hero/Hero";
import ImageGrid from "@/components/ImageGrid";
import useSearchImage from "@/hooks/useSearchImage";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSearchParams } from "next/navigation";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const {
    photos,
    loading,
    searchQuery,
    handleSearchInput,
    handleSearchSubmit,
    firstLoad,
    fetchSearchResults,
    errorMessage,
    noResults,
  } = useSearchImage({ q });

  useEffect(() => {
    fetchSearchResults();
  }, [q]);

  useInfiniteScroll(fetchSearchResults, loading);

  return (
    <>
      <Hero
        search={
          searchQuery ? handleSearchSubmit : () => (window.location.href = "/")
        }
        searchQuery={searchQuery}
        onInputChange={handleSearchInput}
      />
      <div className="flex flex-col items-center justify-start bg-gray-800">
        {loading && firstLoad ? (
          <div className="flex flex-col items-center mt-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading images...</p>
          </div>
        ) : (
          <ImageGrid photos={photos} />
        )}
        {(errorMessage || (noResults && !loading)) && (
          <div className="error-message text-center mt-20">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-300 md:text-5xl lg:text-6xl dark:text-white">
              {errorMessage ? (
                <span className="text-red-500">發生錯誤</span>
              ) : (
                <>
                  您的{" "}
                  <span className="text-indigo-500 dark:text-blue-500">
                    關鍵字
                  </span>{" "}
                  沒有找到符合的圖片
                </>
              )}
            </h1>
            <p className="text-lg text-gray-500 lg:text-xl dark:text-gray-400 mb-20">
              {errorMessage
                ? "請稍後再試，或聯繫網站管理員。"
                : "您可能輸入了無效的關鍵字，請搜尋簡單明瞭的詞，如貓、cat。"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
