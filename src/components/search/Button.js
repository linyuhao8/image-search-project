export default function Button({ search, searchQuery }) {
  const buttonColor = searchQuery
    ? "bg-indigo-500 hover:bg-indigo-400"
    : "bg-btn hover:bg-btnHover"; // 根据是否有输入来改变按钮颜色

  return (
    <>
      <button
        type="button"
        className={`flex-none rounded-md grow-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${buttonColor}`}
        onClick={search}
        value=""
      >
        {searchQuery ? "搜尋相關圖片" : "搜尋隨機圖片"}
      </button>
    </>
  );
}
