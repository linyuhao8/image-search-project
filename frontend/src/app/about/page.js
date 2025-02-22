import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

const features = [
  {
    name: "功能",
    description: "前後端分離架構，通過API實現圖片的隨機展示或關鍵字搜尋。",
    icon: CloudArrowUpIcon,
  },
  {
    name: "直覺UI設計",
    description:
      "簡單易用的界面設計，讓用戶快速搜尋並瀏覽圖片，提供流暢的使用體驗。",
    icon: LockClosedIcon,
  },
  {
    name: "無限加載",
    description:
      "點擊「載入更多」後，會持續加載隨機圖片或搜尋結果，實現無限滾動功能。",
    icon: ServerIcon,
  },
];

export default function About() {
  return (
    <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-300">
                找到絕佳照片
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-200 sm:text-5xl">
                Image Search
              </p>
              <p className="mt-6 text-lg/8 text-gray-300">
                本作品為本人開發的 Side Project，主要目的是練習
                前後端分離架構，並整合第三方
                API（Pexels）來打造一個流暢的圖片搜尋網站。這個專案幫助我更熟悉
                Next.js、Express、API 整合、React Masonry
                瀑布流排版、環境變數管理 (.env) 等技術。
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-200">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-indigo-300"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            alt="Product screenshot"
            src="/homePage.png"
            width={1500}
            height={900}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
