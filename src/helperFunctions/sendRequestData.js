import axios from "axios";
export default async function sendReq(serviceID, des, budget, date) {
  const reqData = {
    servicesId: serviceID,
    description: des,
    budget: budget,
    deadline: date,
  };
  try {
    const response = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/client/post-request`,
      reqData,
      { withCredentials: true }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}
