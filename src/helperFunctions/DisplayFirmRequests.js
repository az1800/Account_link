import axios from "axios";

export async function diplayRequests() {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/account_firm/getAccountFirmRequests`;
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
