import Image from "next/image";
export default function Grid({ photos }) {
  return (
    <div className="columns-2 gap-6 md:columns-3 lg:columns-4 xl:column-5 p-6">
      {photos.map((photo) => (
        <div className="mb-4 break-inside-avoid" key={photo.id}>
          <Image
            src={photo.src.large}
            width={photo.width}
            height={photo.height}
            alt={photo?.alt || "image"}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
