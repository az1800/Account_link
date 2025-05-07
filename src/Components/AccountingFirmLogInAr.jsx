import React from "react"; // This should be at the top
import "../ComopnentsCss/clientLogin.css";
import logo from "../Assets/logo.png";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import ButtonGroupContainer from "../Components/ButtonGroupContainer";
import Header from "./Header";
import WordsBetweenlines from "../Components/WordsBetweenlines";
import {
  validatePassword,
  validateEmail,
} from "../helperFunctions/ValidateInput";
import { useRef, useState } from "react";
import { firmLoginData } from "../helperFunctions/SendLoginData";

function AccountingFirmLogIn() {
  const password = useRef();
  const [passwordErrorMessage, setPassworeErrorMessage] = useState("");
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const email = useRef();
  const [emailErrorMessage, setemailErrorMessage] = useState("");

  function handleEmailErrorMessage() {
    const emailErrorMsg = validateEmail(email.current.value, "En");
    setemailErrorMessage(emailErrorMsg);
  }

  function handlePassworErrorMessage() {
    const passwordErrorMsg = validatePassword(password.current.value, "En");
    setPassworeErrorMessage(passwordErrorMsg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await firmLoginData(
      email.current.value,
      password.current.value
    );

    if (response==='200') {
      navigate("/");
    } else if (response === "404") {
      setSubmitError(
        <div style={{ color: "red" }}>
          <p>أنت غير مسجل الدخول!</p>
        </div>
      );
    } else {
      setSubmitError(
        <div style={{ color: "red" }}>
          <p>البريد الإلكتروني أو كلمة المرور غير صحيحة!</p>
        </div>
      );
    }
  }

  return (
    <>
      <Header className="SLHeader" />
      {submitError !== "" ? submitError : ""}

      <form className="logInForm" onSubmit={handleSubmit}>
        <ButtonGroupContainer
          status="accountingFirm"
          style={{ width: "35rem" }}
        />
        <h1>مرحبًا بعودتك!</h1>
        <p>أدخل بياناتك للوصول إلى حسابك</p>
        <MDBInput
          ref={email}
          label="أدخل بريدك الإلكتروني"
          id="form1Example1"
          type="email"
          onBlur={handleEmailErrorMessage}
        />
        {emailErrorMessage && (
          <p style={{ color: "red", textAlign: "right" }}>
            {emailErrorMessage}
          </p>
        )}

        <Link
          style={{
            marginLeft: "auto",
            marginRight: "0",
            display: "block",
            textAlign: "right",
            marginBottom: "-1rem",
          }}
        >
          هل نسيت كلمة المرور؟
        </Link>
        <MDBInput
          ref={password}
          label="أدخل كلمة المرور"
          id="form1"
          type="text"
          onBlur={handlePassworErrorMessage}
        />
        {passwordErrorMessage && (
          <p style={{ color: "red", textAlign: "right" }}>
            {passwordErrorMessage}
          </p>
        )}

        <MDBCheckbox id="form1Example3" label="تذكرني" defaultChecked />
        <MDBRow className="mb-4">
          <MDBCol className="d-flex justify-content-center"></MDBCol>
          <MDBCol style={{ width: 155 }}></MDBCol>
        </MDBRow>

        <MDBBtn type="submit" className="mb-4" block>
          تسجيل الدخول
        </MDBBtn>

        <WordsBetweenlines text="أو تسجيل الدخول باستخدام" />
        <div
          className="text-center"
          style={{ display: "flex", gap: "10px", marginTop: "3rem" }}
        >
          <MDBBtn
            color="link"
            style={{
              border: "2px solid rgba(0, 0, 0, 0.5)",
              marginRight: "1rem",
              flex: "1",
            }}
          >
            {" "}
            <MDBIcon fab icon="google" style={{ color: "black" }} />
          </MDBBtn>
          <MDBBtn
            color="link"
            style={{
              border: "2px solid rgba(0, 0, 0, 0.5)",
              flex: "1",
            }}
          >
            <MDBIcon fab icon="apple" style={{ color: "black" }} />{" "}
          </MDBBtn>
        </div>
        <p style={{ marginTop: "1.5rem" }}>
          لست عضواً؟ <Link to="/signup">إنشاء حساب</Link>
        </p>
      </form>
    </>
  );
}

export default AccountingFirmLogIn;
