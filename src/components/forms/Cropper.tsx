"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ReactCrop, {
  makeAspectCrop,
  centerCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
const Cropper = ({
  image,
  setImageURL,
}: {
  image: HTMLImageElement;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>(
    centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        1,
        image.width,
        image.height,
      ),
      image.width,
      image.height,
    ),
  );
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [blob, setBlob] = useState<string>("");
  const handleCrop = useCallback(async () => {
    const imgContainer = imgRef.current;
    if (image && completedCrop && imgContainer) {
      const ratio = [
        image.width / imgContainer.width,
        image.height / imgContainer.height,
      ];
      const offscreen = new OffscreenCanvas(
        completedCrop.width * ratio[0],
        completedCrop.height * ratio[1],
      );
      const ctx = offscreen.getContext("2d");
      if (!ctx) throw new Error("Нету 2d контекста");

      ctx.drawImage(
        image,
        completedCrop.x * ratio[0],
        completedCrop.y * ratio[1],
        completedCrop.width * ratio[0],
        completedCrop.height * ratio[1],
        0,
        0,
        offscreen.width,
        offscreen.height,
      );
      const blob = await offscreen.convertToBlob({
        type: "image/webp",
      });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = async () => {
        const image = reader.result as string;
        setBlob(image);
        setImageURL(image);
      };
    }
  }, [image, completedCrop, setImageURL]);
  useEffect(() => {
    handleCrop();
  }, [handleCrop]);
  return (
    <>
      <ReactCrop
        crop={crop}
        aspect={1}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => {
          setCompletedCrop(c);
        }}
        minHeight={50}
        minWidth={50}
      >
        <Image
          src={image.src}
          ref={imgRef}
          width={0}
          height={0}
          style={{
            maxHeight: 600,
            maxWidth: 800,
            objectFit: "contain",
            height: "auto",
            width: "auto",
          }}
          alt="avatar"
        />
      </ReactCrop>
    </>
  );
};

export default Cropper;
