import axios from "axios";

export async function listFirmChat() {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/direct_chat/FIRM/List-Conversation`;

  try {
    const response = await axios.post(url, [], { withCredentials: true });
    if (response.status === 200) return response.data.data;
    return "400";
  } catch (err) {
    console.log("Xxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log("error", err);
    return "400";
  }
}
