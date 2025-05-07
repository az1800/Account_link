export async function userLoginData(email, password, type = "client") {
  //this function send user login page date to back end its sends(email,password)
  const userData = {
    email: email,
    password: password,
    userType: type,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
      {
        //from here u can choose the url u wnat in back-end
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response

    if (response.ok) {
      return data.data;
    } else if (response.status === 400) {
      return "400";
    } else {
      return "404";
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

export async function userRegisterData(
  email,
  password,
  name,
  number,
  type = "client"
) {
  const firmData = {
    email: email,
    password: password,
    type: type,
    number: number,
    userName: name,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`,
      {
        //from here u can choose the url u wnat in back-end
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firmData),
        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response

    if (response.ok) {
      return "200";
    } else {
      return false;
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
export async function firmRegisterData(
  email,
  password,
  cr,
  firmAddress,
  Cd,
  name,
  type = "firm"
) {
  const firmData = {
    email: email,
    password: password,
    type: type,
    commercialRegister: cr,
    address: firmAddress,
    firmName: name,
    certificationDetails: Cd,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`,
      {
        //from here u can choose the url u wnat in back-end
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firmData),
        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response

    if (response.ok) {
      return "200";
    } else {
      return false;
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

export async function firmLoginData(email, password, type = "firm") {
  const userData = {
    email: email,
    password: password,
    userType: type,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
      {
        //from here u can choose the url u wnat in back-end
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response

    if (response.ok) {
      return data.data;
    } else if (response.status === 400) {
      return "400";
    } else {
      return "404";
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

export async function adminLoginData(email, password, type = "admin") {
  const userData = {
    email: email,
    password: password,
    userType: type,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
      {
        //from here u can choose the url u wnat in back-end
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      }
    );

    const data = await response.json(); // Parse response

    if (response.ok) {
      return "200";
    } else if (response.status === 400) {
      return "400";
    } else {
      return "404";
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
