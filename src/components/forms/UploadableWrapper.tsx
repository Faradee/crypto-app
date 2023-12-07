"use client";
import { useState } from "react";
import Uploadable from "./Uploadable";

type UploadableWrapperProps = {
  children: React.ReactNode;
  handleUpload: (fileList: FileList) => void;
  drag: boolean;
};

const UploadableWrapper = (props: UploadableWrapperProps) => {
  const { children, handleUpload, drag } = props;
  const [localDim, setLocalDim] = useState<boolean>(false);
  return (
    <div
      className="h-full w-auto"
      onDragEnter={(e) => {
        e.preventDefault();
        if (drag) setLocalDim(true);
      }}
      onDrop={(e) => e.preventDefault()}
    >
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setLocalDim(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setLocalDim(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLocalDim(false);
          handleUpload(e.dataTransfer.files);
        }}
        className="absolute z-10 hidden h-full w-full select-none items-center justify-center overflow-hidden bg-black text-white opacity-70"
        style={localDim ? { display: "flex" } : {}}
      >
        <Uploadable />
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};

export default UploadableWrapper;
