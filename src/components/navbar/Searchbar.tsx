"use client";
import { useCallback, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams, useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { useClickOutside } from "../containers/DropDownContainer";
import { FaArrowLeft } from "react-icons/fa6";
//TODO: FIX HIDING
const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const formRef = useRef(null);
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (query !== "") {
        const params = new URLSearchParams(searchParams);
        params.set("search", query);
        if (params.has("page")) params.delete("page");
        router.replace("/?" + params.toString());
      }
    },
    [searchParams, query, router],
  );
  useClickOutside(formRef, () => setIsActive(false));
  return (
    <>
      <button
        className={`relative flex items-center justify-center rounded-full p-1 before:absolute before:h-[50px] before:w-[50px] before:rounded-full before:opacity-70 hover:before:bg-slate-100 active:before:bg-slate-200 md:hidden`}
        onClick={() => setIsActive(true)}
      >
        <CiSearch size={30} />
      </button>

      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        className={`absolute z-50 -mx-5   h-full w-full min-w-[30px] items-center justify-center rounded-xl bg-white p-1 md:static md:mx-5 md:flex md:w-1/2 md:px-0 ${
          isActive ? "flex" : "hidden"
        }`}
      >
        <button
          onClick={() => setIsActive(false)}
          className={`relative mr-2 flex items-center justify-center rounded-full bg-white before:absolute before:h-[50px] before:w-[50px] before:rounded-full before:opacity-70 hover:before:bg-slate-100 active:before:bg-slate-200 md:hidden ${
            isActive ? "visible" : "hidden"
          }`}
        >
          <FaArrowLeft size={30} />
        </button>
        <div className="flex h-3/5 w-full md:h-full">
          <label className="relative flex h-full w-full flex-grow rounded-s-xl border border-black font-normal  outline-none focus-within:border-blue-500 ">
            <input
              className="h-full w-full rounded-s-xl px-2 outline-none"
              value={query}
              name="query"
              type="text"
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
            {query && (
              <div
                onClick={() => setQuery("")}
                className="relative flex cursor-pointer items-center justify-center rounded-full p-1 before:absolute before:h-[50px] before:w-[50px] before:rounded-full before:opacity-70 hover:before:bg-slate-100 active:before:bg-slate-200"
              >
                <AiOutlineClose size={30} />
              </div>
            )}
          </label>
          <button
            type="submit"
            title="Поиск"
            className="flex h-full w-[50px] flex-grow-0 items-center justify-center rounded-e-xl border border-l-0 border-black bg-white active:bg-slate-50"
          >
            <CiSearch size={30} />
          </button>
        </div>
      </form>
    </>
  );
};

export default Searchbar;
