"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/hero/Hero";
import ImageGrid from "../../components/ImageGrid";
import useRandomImages from "@/hooks/useRandomImage";
import useSearchImage from "@/hooks/useSearchImage";

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

  return (
    <>
      <div>
        <Hero
          search={handleSearchSubmit}
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
                onClick={fetchSearchResults}
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
