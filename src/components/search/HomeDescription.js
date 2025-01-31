import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

export default function HomeDescription() {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
      <div className="flex flex-col items-start">
        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
          <CalendarDaysIcon aria-hidden="true" className="size-6 text-white" />
        </div>
        <dt className="mt-4 text-base font-semibold text-white">
          探索無限創意圖片
        </dt>
        <dd className="mt-2 text-base/7 text-gray-400">
          無論你需要獨特的插圖、風景照，還是高質量的背景，只需輸入關鍵字，我們會提供大量符合需求的選項，幫助你迅速找到靈感。
        </dd>
      </div>
      <div className="flex flex-col items-start">
        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
          <HandRaisedIcon aria-hidden="true" className="size-6 text-white" />
        </div>
        <dt className="mt-4 text-base font-semibold text-white">
          按需搜尋您的圖片素材
        </dt>
        <dd className="mt-2 text-base/7 text-gray-400">
          專為設計師、內容創作者和藝術家設計，這裡是你尋找圖片素材的最佳場所。
        </dd>
      </div>
    </dl>
  );
}
