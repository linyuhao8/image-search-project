import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

export default function Search({
  search,
  searchQuery,
  onInputChange,
  buttonText,
}) {
  const buttonColor = searchQuery
    ? "bg-indigo-500 hover:bg-indigo-400"
    : "bg-btn hover:bg-btnHover"; // 根据是否有输入来改变按钮颜色
  const borderColor = searchQuery
    ? "focus:outline-1 focus:outline-indigo-400" // If there’s input, apply a focus color
    : "focus:outline-1 focus:outline-btnHover"; // If no input, use a neutral border color

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Search the image for un pricing.
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Enter keyword and Search the image you wnat.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="keyword"
                name="keyword"
                type="text"
                required
                placeholder="如果沒有輸入可以直接搜尋隨機圖片"
                autoComplete="keyword"
                className={`min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 ${borderColor} sm:text-sm`}
                value={searchQuery}
                onChange={onInputChange}
              />
              <button
                type="submit"
                className={`flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${buttonColor}`}
                onClick={search}
                value=""
              >
                {buttonText}
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                探索無限創意圖片
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                無論你需要獨特的插圖、風景照，還是高質量的背景圖片，我們的搜尋引擎讓你輕鬆找到完美的圖片。只需輸入關鍵字，我們會提供大量符合需求的選項，幫助你迅速找到靈感。
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                按需搜尋您的圖片素材
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                專為設計師、內容創作者和藝術家設計，這裡是你尋找圖片素材的最佳場所。無論是免費還是付費素材，我們的搜尋引擎能提供多樣化的選擇，讓你輕鬆找到符合專案需求的圖片。
              </dd>
            </div>
          </dl>
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
          className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
}
