"use client";

import Image, { StaticImageData } from "next/image";
import placeholder from "/public/placeholder.svg";
import { memo, useEffect, useState } from "react";
const ImageFallback = ({
  src,
  alt,
  width,
  height,
  fallback = true,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallback?: boolean;
}) => {
  const [image, setImage] = useState<string | StaticImageData>(src);
  useEffect(() => {
    setImage(src);
  }, [src]);
  if (image)
    return (
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        onError={() => {
          if (fallback) setImage(placeholder);
          else setImage("");
        }}
      />
    );
};
export default ImageFallback;
