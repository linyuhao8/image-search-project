import { useEffect } from "react";

const useInfiniteScroll = (callback, loading) => {
  const handleScroll = () => {
    //頁面的整體高度
    const scrollHeight = document.documentElement.scrollHeight;
    //使用者所在的位置，最下方
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;

    //如果滾動到最下面就觸發
    if (scrollPosition >= scrollHeight - 50 && !loading) {
      callback();
    }
  };
  useEffect(() => {
    let debounceTimer; // 用來存儲 `setTimeout` 的計時器

    // 防抖函式：在滾動時重置計時器，等 500ms 內沒有新的滾動才執行 handleScroll
    const debouncedHandleScroll = () => {
      clearTimeout(debounceTimer); // 每次滾動時都清除前一次的計時器
      debounceTimer = setTimeout(() => {
        handleScroll(); // 只有在 500ms 內沒有新的滾動時，才執行 handleScroll
      }, 500); // 設定防抖時間為 500ms
    };

    // 監聽滾動事件，當滾動時執行 debouncedHandleScroll（帶有防抖機制）
    window.addEventListener("scroll", debouncedHandleScroll);

    // 當 `useEffect` 重新執行或組件卸載時，清除滾動事件監聽
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []); // `[]` 表示只在組件掛載時執行一次
};
export default useInfiniteScroll;
