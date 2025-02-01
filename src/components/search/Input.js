export default function Input({ searchQuery, onInputChange, search }) {
  const borderColor = searchQuery
    ? "focus:outline-1 focus:outline-indigo-400" // If there’s input, apply a focus color
    : "focus:outline-1 focus:outline-btnHover"; // If no input, use a neutral border color
  // 處理鍵盤按鍵事件
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 防止預設行為（如換行）
      search();
    }
  };
  return (
    <>
      <input
        id="keyword"
        name="keyword"
        type="text"
        required
        placeholder="如果沒有輸入可以直接搜尋隨機圖片"
        autoComplete="keyword"
        className={`min-w-70 flex-auto grow-2 rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 ${borderColor} sm:text-sm`}
        value={searchQuery}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}
