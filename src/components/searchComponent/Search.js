import Button from "./Button";
import HomeDescription from "./HomeDescription";
import Input from "./Input";
import { useSearchParams } from "next/navigation";

export default function Search({ search, searchQuery, onInputChange }) {
  const searchParams = useSearchParams(); // 用於獲取查詢參數
  const q = searchParams.get("q"); // 取得 'q' 參數
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              {q ? `搜尋結果：${q}` : "免費搜尋圖片"}
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              所有皆為無版權圖片，歡迎下載。
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <Input
                onInputChange={onInputChange}
                searchQuery={searchQuery}
                search={search}
              />
              <Button search={search} searchQuery={searchQuery} />
            </div>
          </div>
          <HomeDescription />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
}
