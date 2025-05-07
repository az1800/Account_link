import React, { useState,useEffect } from "react";
import { sendService } from "../helperFunctions/PostService";
import { displayServiceData,UpdateFirmService } from "../helperFunctions/FirmService";

function AddService(props) {console.error("we are in the add Service !!!!!!!");
  const [formData, setFormData] = useState({
    serviceName: "",
    servicePrice: "",
    serviceDes: "",
    serviceImage: null,
    serviceID: props.serviceID,
    
  });

const isUpdate= props.service ? true:false;


useEffect(()=>{
  if(props.service){
    async function serviceInformation(){
      const res = await displayServiceData(props.service);
      if(res!=='400'){
        setFormData({
          serviceName: res.name || "",
          servicePrice: res.price || "",
          serviceDes: res.description || "",
          serviceImage: res.image || null,
          serviceID: props.service,
        });
    
    
    
    
      }else
      {
      console.error("Error occured !!!!");
      }
    }
      
      serviceInformation();
    }
    
     
    

},[props.service]);
  






  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  async function sendData(e) {
    e.preventDefault();

    const serviceName = e.target.elements.serviceName.value;
    const serviceDes = e.target.elements.serviceDes.value;
    const servicePrice = e.target.elements.price.value;

    if (serviceName !== "" && serviceDes !== "" && servicePrice !== "") {console.log(props.firmId+"@#@#!@#!@#@");
      try {
        const response = await sendService(
          formData.serviceName,
          formData.serviceDes,
          formData.servicePrice,
          props.firmId,
          formData.serviceImage
        );

        if (response === 200) {
          setMessage({ type: "success", text: "Service added successfully!" });
          setTimeout(location.reload(),9000);
        } else {
          setMessage({
            type: "error",
            text: "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error(error);
        setMessage({
          type: "error",
          text: "An error occurred while adding the service.",
        });
      }
    } else {
      setMessage({
        type: "error",
        text: "You cannot send empty data.",
      });
    }
  }

//{ serviceID, name, description, price }
  const handleSubmittBtn = async (e)=>{
    e.preventDefault();
     //props.serviceID
const response = await UpdateFirmService(formData.serviceID,formData.serviceName,formData.serviceDes,formData.servicePrice,formData.serviceImage ); 

if(response === 200){
  console.log("We edit the service correctly !!!!!");
  location.reload();
}
else {
console.log("something went wrong !!!!");}
  };

  return (
    <form onChange={handleChange} onSubmit={isUpdate? handleSubmittBtn: sendData}>
      <div className="mx-auto max-w-[40rem] flex flex-col mt-5 gap-4 bg-gray-200 p-5 rounded-md">
        {message.text && (
          <div
            className={`p-3 rounded-md text-white ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="text"
          id="serviceName"
          name="serviceName"
          placeholder="Service's name"
        value={ formData.serviceName }
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2 bg-[#f6f6f6]"
        />
        <input
          type="text"
          id="serviceDes"
          name="serviceDes"
          placeholder="Description"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2 bg-[#f6f6f6]"
          value={ formData.serviceDes }
        />
        <input
          type="text"
          id="price"
          name="servicePrice"
          placeholder="Price"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2 bg-[#f6f6f6]"
          value={ formData.servicePrice }
        />

        <label
          htmlFor="serviceImage"
          className="border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
        >
          <div className="text-center">
            <button
              type="button"
              className="bg-[rgba(91,184,255,1)] hover:bg-[rgba(91,184,255,0.8)] text-white rounded-full py-2 px-4 mt-4"
            >
              Upload a Profile Picture
            </button>
            <p className="text-gray-500">or drag photo here</p>
            <p className="text-gray-500 text-sm mt-1 mb-4">PNG, JPG, SVG</p>
          </div>
        </label>
        <input
          id="serviceImage"
          name="serviceImage"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleChange}
        />
        <button
          type="submit"
         
          className="block w-full bg-[rgba(91,184,255,1)] hover:bg-[rgba(91,184,255,0.8)] text-white font-bold py-3 px-4 rounded-full"
        >
          {`${props.status === "add" ? "Add" : "Edit"} Service`}
        </button>
      </div>
    </form>
  );
}

export default AddService;
