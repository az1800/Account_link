import axios from "axios";

export async function acceptRequest(id) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/account_firm/acceptRequest`;
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

export async function rejectRequest(id, msg) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/account_firm/rejectRequest`;
  try {
    const response = await axios.post(
      url,
      { requestID: id, rejectionMessage: msg },
      { withCredentials: true }
    );
    if (response.status === 200) return 200;
    return 400;
  } catch (err) {
    console.log(err);
  }
}
