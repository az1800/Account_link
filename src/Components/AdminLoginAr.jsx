import React from "react"; // Add this import
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
import { adminLoginData } from "../helperFunctions/SendLoginData";

export default function AdminLoginAr() {
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
    const response = await adminLoginData(
      email.current.value,
      password.current.value,
      "client"
    );

    if (response==='200') {
      navigate("/");
    }
    {
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
        <ButtonGroupContainer status="Admin" style={{ width: "35rem" }} />
        <h1>مرحبًا بعودتك!</h1>
        <p>أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك</p>
        <MDBInput
          ref={email}
          label="البريد الإلكتروني"
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
      </form>
    </>
  );
}
