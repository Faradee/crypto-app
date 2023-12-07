import { AiOutlineCloudUpload } from "react-icons/ai";
type UploadableProps = {
  textless?: boolean;
};
const Uploadable = (props: UploadableProps) => {
  return (
    <div
      className={`pointer-events-none flex ${
        !props.textless && "-translate-y-[50%]"
      } flex-col  items-center  justify-center overflow-auto`}
    >
      <AiOutlineCloudUpload
        size={"150"}
        className="pointer-events-none relative "
      />
      {!props.textless && (
        <span className="pointer-events-none">
          Отпустите чтобы загрузить файл
        </span>
      )}
    </div>
  );
};

export default Uploadable;
