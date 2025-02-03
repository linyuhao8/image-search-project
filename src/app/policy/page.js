"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const Policy = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-3 sm:py-7 lg:py-10">
          <div className="sm:mb-8 sm:flex sm:justify-center px-9">
            <div className="relative rounded-full px-6  py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              搜尋所有你想要找到的美.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-left">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
              <h1 className="text-5xl font-bold text-center mb-6">
                隱私權政策
              </h1>
              <p className="text-lg mb-6">
                我們非常重視您的隱私。本隱私權政策將說明我們如何收集、使用、保護以及披露您的個人資訊，並解釋您如何控制您的資訊。隨著技術和法律的發展，我們會定期更新這個政策，以確保您了解我們如何處理您的資料。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
                    資訊收集
                  </h2>
                  <p className="mb-4">
                    我們會收集您在使用本網站時提供的各類資訊，包括您的姓名、電子郵件地址、電話號碼、位置信息及其他您願意提供的資料。我們可能還會自動收集一些技術性資料，如IP位址、瀏覽器類型和操作系統，以改善服務體驗。
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
                    資訊使用
                  </h2>
                  <p className="mb-4">
                    我們使用您的資訊來提供、改進和個性化我們的服務。我們可能會根據您的需求發送與我們產品或服務相關的通知，或是為了遵守法律要求進行處理。
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
                    資訊保護
                  </h2>
                  <p className="mb-4">
                    我們致力於保護您的個人資料，並使用多層安全措施來防止未經授權的訪問、披露或更改。這些措施包括數據加密、訪問控制和持續的安全監測。
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
                    第三方披露
                  </h2>
                  <p className="mb-4">
                    除非法律要求或您同意，否則我們不會將您的個人資訊出售、交易或出租給第三方。我們可能會將您的資訊提供給受信任的第三方服務提供商，他們會幫助我們處理業務運營。
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
                    Cookies使用
                  </h2>
                  <p className="mb-4">
                    我們的網站可能會使用cookies來增強您的瀏覽體驗。您可以選擇禁用cookies，但這可能會影響某些功能的使用。
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
                    更新
                  </h2>
                  <p className="mb-4">
                    我們可能會不定期更新此隱私權政策。如果有重大變更，我們將在網站上發布更新的政策或直接通知您。
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
                    聯繫我們
                  </h2>
                  <p className="mb-2">
                    如果您對此隱私權政策有任何問題或疑慮，請隨時聯繫我們。我們將盡快回覆並解答您的疑問。
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center gap-x-6">
              <a
                href="http://localhost:3000"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                去逛逛圖片
              </a>
              <a
                href="http://localhost:3000/about"
                className="text-sm font-semibold text-gray-900"
              >
                關於我們 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Policy;
