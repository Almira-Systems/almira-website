"use effect";

import Image from "next/image";

interface ImageScrollerProps {
  images: {
    id: string;
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  id?: string;
}

const ImageScroller = ({ images, id }: ImageScrollerProps) => {
  return (
    <div id={id}>
      {images.map((image) => (
        <Image
          width={image.width ?? 200}
          height={image.height ?? 200}
          key={image.id}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </div>
  );
};

export default ImageScroller;
