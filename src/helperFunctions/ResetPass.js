import axios from "axios";
export async function passwordReset(email) {
  const userData = { email: email };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/resetPassword/validateEmail`,
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

    if (response.ok) {
      return "200";
    } else if (response.status === 404) {
      return "404";
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
export async function validateOTP(OTP, email) {
  const otpS = OTP + "";
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/resetPassword/validateOTP`;
  const userData = { otp: otpS, email: email };
  try {
    const response = await fetch(url, {
      //from here u can choose the url u wnat in back-end
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (response.ok) {
      return "200";
    } else if (response.status === 404) {
      return "404";
    } else if (response.status === 400) {
      return "400";
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

export async function sendNewPass(email, Password, Cpassword) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/resetPassword/storePassword`;
  const userData = {
    newPassword: Password,
    email: email,
    confirmPassword: Cpassword,
  };
  try {
    const response = await fetch(url, {
      //from here u can choose the url u wnat in back-end
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (response.ok) {
      return "200";
    } else if (response.status === 404) {
      return "404";
    } else if (response.status === 400) {
      return "400";
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
