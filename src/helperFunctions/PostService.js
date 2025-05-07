import axios from "axios";

export async function sendService(
  serviceName,
  serviceDes,
  servicePrice,
  firmId,
  image
) {
  const serviceForm = new FormData();
  serviceForm.append("firmID", firmId);
  serviceForm.append("name", serviceName);
  serviceForm.append("description", serviceDes);
  serviceForm.append("price", servicePrice);
  serviceForm.append("image", image);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/account_firm/firm-post-service`,
      serviceForm,
      { headers: { imageType: "service" }, withCredentials: true }
    );
    console.log("Upload success:", response.data);
    return response.status;
  } catch (error) {
    return error;
  }
}

export async function displayFirmService(id) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/client/firm-display-service?id=${id}`;
  try {
    console.log("the fetch went goooooooooooooooood!!!!!!!!!!");
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
