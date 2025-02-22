// 从 Next.js 导入 Image 组件，用于优化图片加载
import Image from "next/image";
import Masonry from "react-masonry-css";
export default function Grid({ photos }) {
  const breakpointColumnsObj = {
    default: 5, // 預設 5 列
    1400: 4,
    1100: 3, // 當螢幕寬度小於 1100px 時，顯示 4 列
    700: 2, // 當螢幕寬度小於 700px 時，顯示 3 列
    500: 2, // 當螢幕寬度小於 500px 時，顯示 2 列
  };

  return (
    <div className="p-6">
      <Masonry
        breakpointCols={breakpointColumnsObj} // 設定響應式列數
        className="flex gap-4" // 可選，用來控制外部容器的樣式
        columnClassName="" // 每一列的間距
      >
        {photos.map((photo) => (
          <div key={photo.id} className="mb-4">
            <a href={photo.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={photo.src.large}
                width={photo.width}
                height={photo.height}
                alt={photo?.alt || "image"}
                className="rounded-lg"
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </a>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
