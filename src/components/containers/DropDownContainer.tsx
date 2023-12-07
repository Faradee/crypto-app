import { RefObject, useEffect } from "react";

//хук для обработки клика вне рефа
export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  onClickOutside: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
const DropDownContainer = ({
  children,
  active,
}: {
  children: JSX.Element;
  active: boolean;
}) => {
  return (
    <div
      className={`container absolute right-0 top-[90%] z-10 mx-auto mt-2 w-[300px] cursor-auto rounded-md border bg-white p-2 shadow-md transition-all duration-100 ${
        active ? " opacity-100 " : " invisible mt-5 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default DropDownContainer;
