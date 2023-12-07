type HamburgerProps = {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const HamburgerIcon = ({ active, onClick }: HamburgerProps) => {
  return (
    <div
      className="mr-5 cursor-pointer p-2 hover:bg-slate-200 "
      onClick={onClick}
    >
      <span
        className={`block ${
          active ? "translate-y-[6px] -rotate-45" : "rotate-0"
        } mb-1 mt-0.5 h-[2px] w-[20px] bg-slate-800 transition-all duration-300 ease-out`}
      ></span>
      <span
        className={`block ${
          active ? "opacity-0" : "opacity-100"
        } mb-1 h-[2px] w-[20px] bg-slate-800 transition-all duration-300 ease-out`}
      ></span>
      <span
        className={`block ${
          active ? "translate-y-[-6px] rotate-45" : "rotate-0"
        } h-[2px] w-[20px] bg-slate-800 transition-all duration-300 ease-out`}
      ></span>
    </div>
  );
};

export default HamburgerIcon;
