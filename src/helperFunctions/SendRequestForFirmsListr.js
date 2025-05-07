export async function SendRequest() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/client/firmList`,
      {
        //from here u can choose the url u wnat in back-end
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response

    if (response.ok) {
      return data;
    }
  } catch (error) {
    return "404";
  }
}

export async function SendRequestForFirmProfile(id) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/client/firmProfile?id=${id}`,
      {
        //from here u can choose the url u wnat in back-end
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response
    if (response.ok) {
      return data.data;
    }
  } catch (error) {
    return "404";
  }
}

export async function SendRequestForFirmProfile2(id) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/account_firm/firmProfile`,
      {
        //from here u can choose the url u wnat in back-end
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ AccountFirmId: id }),
        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response
    if (response.ok) {
      return data.data;
    }
  } catch (error) {
    return "404";
  }
}

export async function sendRequestByName(searchedItem) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/client/firmSearch`,
      {
        //from here u can choose the url u wnat in back-end
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchedItem }),
        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response
    if (response.ok) {
      return data;
    }
  } catch (error) {
    return "404";
  }
}
