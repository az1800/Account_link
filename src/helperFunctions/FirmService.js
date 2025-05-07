import axios from "axios";

export async function deleteService(serviceId) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/account_firm/delete-service?id=${serviceId}`;

  try {
    const response = await axios.get(url);
    return response.status;
  } catch (erorr) {
    console.log("this is from helper function !!!!" + erorr);
  }
}

export async function displayServiceData(serviceId) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/account_firm/getAccountFirmService?id=${serviceId}`;

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (erorr) {
    return "400";
  }
}
//{ serviceID, name, description, price }
export async function UpdateFirmService(
  serviceID,
  name,
  description,
  price,
  image
) {
  const uploadData = new FormData();
  uploadData.append("serviceID", serviceID);
  uploadData.append("image", image);
  uploadData.append("name", name);
  uploadData.append("description", description);
  uploadData.append("price", price);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/account_firm/update-service`,
      uploadData,
      { headers: { imageType: "service" }, withCredentials: true }
    );

    console.log("Upload success:", response.status);
    return response.status;
  } catch (error) {
    return error;
  }
}
