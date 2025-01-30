// 从 Next.js 导入 Image 组件，用于优化图片加载
import Image from "next/image";

export default function Grid({ photos }) {
  return (
    // 使用 Tailwind CSS 定义响应式列布局和内边距
    <div className="columns-2 gap-6 md:columns-3 lg:columns-4 xl:column-5 p-6">
      {/* 遍历 photos 数组并显示每张图片 */}
      {photos.map((photo) => (
        <div className="mb-4 break-inside-avoid" key={photo.id}>
          {/* 将图片包装在链接中，允许用户点击查看完整照片 */}
          <a href={photo.url}>
            {/* 使用 Next.js 的 Image 组件优化图片性能 */}
            <Image
              src={photo.src.large} // 图片 URL
              width={photo.width} // 图片宽度
              height={photo.height} // 图片高度
              alt={photo?.alt || "image"} // 图片的替代文本；如果没有提供则使用 "image" 作为默认值
              className="rounded-lg border border-stone-400" // 使用 Tailwind CSS 类样式进行修饰
              priority // 此属性告诉 Next.js 优先加载这张图片，有助于提升页面性能
            />
          </a>
        </div>
      ))}
    </div>
  );
}
