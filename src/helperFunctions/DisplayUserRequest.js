import axios from "axios";

export async function diplayUserRequests2() {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/client/display-user-request`;
  try {
    const response = await axios.post(url, [], { withCredentials: true });

    if (response.status === 200) {
      return response.data;
    } else {
      return "error";
    }
  } catch (err) {
    console.error(err);
  }
}
export async function deleteRequest(id) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/client/delete-request`;
  try {
    const response = await axios.post(
      url,
      { requestID: id },
      { withCredentials: true }
    );
    if (response.status === 200) return 200;
    return 400;
  } catch (err) {
    console.log(err);
  }
}
