const ModalContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className="fixed left-1/2 top-1/2 z-30 flex w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-start gap-y-2 rounded-3xl bg-white px-4 py-4 lg:w-1/4 lg:px-12">
        {children}
      </div>
    </>
  );
};

export default ModalContainer;
