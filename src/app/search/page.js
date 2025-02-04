"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/hero/Hero";
import ImageGrid from "../../components/ImageGrid";
import useRandomImages from "@/hooks/useRandomImage";
import useSearchImage from "@/hooks/useSearchImage";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const SearchPage = () => {
  const {
    photos,
    loading,
    searchQuery,
    handleSearchInput,
    handleSearchSubmit,
    firstLoad,
    fetchSearchResults,
  } = useSearchImage();
  // 只有在 q 或 page 改變時才執行搜尋
  useEffect(() => {
    fetchSearchResults();
  }, []);
  useInfiniteScroll(fetchSearchResults, loading);
  return (
    <>
      <div>
        <Hero
          search={
            searchQuery
              ? handleSearchSubmit
              : () => {
                  window.location.href = "/";
                }
          }
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
