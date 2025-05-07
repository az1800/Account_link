import { FaCheckCircle } from "react-icons/fa";
function FirmCard(props) {
  return (
    <>
      <div className="flex flex-col justify-center" onClick={props.onClick}>
        <div className="w-full h-auto min-h-[7rem] relative flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 rounded-xl shadow-lg p-2 max-w-xs md:max-w-2xl mx-auto border border-white bg-white">
          <div className="w-26 md:w-32 relative flex-shrink-0 flex items-center justify-center">
            <div className="absolute top-0 right-0 z-10 mt-1 mr-1">
              {props.isVerified && (
                <FaCheckCircle color="rgba(91,184,255,1)" size={16} />
              )}
            </div>
            <img
              src={props.image}
              alt={props.title || "Company logo"}
              className="rounded-xl w-full h-auto object-contain max-h-24 md:max-h-full"
            />
          </div>
          <div className="w-full bg-white flex flex-col space-y-2 p-2">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-gray-800 md:text-2xl text-lg truncate">
                {props.title}
              </h3>
              <div className="flex items-center"></div>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirmCard;
