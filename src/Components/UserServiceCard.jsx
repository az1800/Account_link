import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PlaceHolder from "../Assets/image.png";
import FileUploader from "./FileUploader";
import AddService from "./AddService";
import { deleteService } from "../helperFunctions/FirmService";
import { useNavigate } from "react-router-dom";
function Card(props) {
  // Destructure props with default values
  const { state, product = {}, profilePic, isVerified } = props;
const Navigate = useNavigate("");



  // Ensure default values for product properties
  const { name = "Unknown Product", price = 0, inStock = false } = product;
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className="max-w-[720px]">
      {/* Card Container */}
      <div
        className="relative flex flex-col text-gray-700 shadow-md bg-clip-border rounded-xl w-96"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        {/* Product Image */}
        <div
          className={`relative mx-4 my-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl ${
            state === "profile" ? "h-[10rem]" : "h-[15rem]"
          }`}
        >
          <img
            src={props.profilePic}
            alt="card-image"
            className="object-cover w-full h-full"
          />

          {/* Verification Icon - Positioned in top right */}
          {state === "profile" && isVerified && (
            <div className="absolute top-0 right-0 z-10 mt-1 mr-1">
              <FaCheckCircle color="rgba(91,184,255,1)" size={16} />
            </div>
          )}
        </div>

        {/* Product Info (Only shown when not in profile mode) */}
        {state !== "profile" && (
          <>
            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="block text-base font-medium text-blue-gray-900">
                  {name}
                </p>
                <p className="block text-base font-medium text-blue-gray-900">
                  ${price.toFixed(2)}
                </p>
              </div>
            </div>
            {/* Button */}
            <div className="p-6 pt-0">
              <button style={{color:'green'}} onClick={()=>{Navigate('/SubmitRequest',
                {state:{
//{serviceID ,firmID, des ,budget, date}
serviceID:props.serviceID,

                }}
              )}}>
Request Service 

</button>

              {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="relative bg-white rounded-lg px-6 pb-6 max-w-lg w-full">
                    <button
                      onClick={toggleModal}
                      className="absolute top-2 right-8 text-2xl text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>


                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
//here we should add a prop that contain a rating and this component shoud return a <div> displaying the rating 
export default Card;
