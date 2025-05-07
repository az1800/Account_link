import React from "react"; // Add this import
import "../ComopnentsCss/clientLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { userLoginData } from "../helperFunctions/SendLoginData";

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
import WordsBetweenlines from "../Components/WordsBetweenlines";
import ButtonGroupContainer from "../Components/ButtonGroupContainer";
import Header from "./Header";
import {
  validatePassword,
  validateEmail,
} from "../helperFunctions/ValidateInput";
import { useRef, useState } from "react";
export default function ClientLogin({ status }) {
  const password = useRef();
  const [passwordErrorMessage, setPassworeErrorMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  function handlePassworErrorMessage() {
    const passwordErrorMsg = validatePassword(password.current.value, "");
    setPassworeErrorMessage(passwordErrorMsg);
  }
  const email = useRef();
  const [emailErrorMessage, setemailErrorMessage] = useState("");
  function handleEmailErrorMessage() {
    const emailErrorMsg = validateEmail(email.current.value, "");
    setemailErrorMessage(emailErrorMsg);
  }
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await userLoginData(
      email.current.value,
      password.current.value
    );

    if (response==='200') {
      navigate("/");
    } else if (response === "404") {
      setSubmitError(
        <div style={{ color: "red" }}>
          <p>البريد الإلكتروني غير مسجل من قبل !</p>
        </div>
      );
    } else {
      setSubmitError(
        <div style={{ color: "red" }}>
          <p> البريد الإلكتروني أو كلمة المرور غير صحيحة !</p>
        </div>
      );
    }
  }

  return (
    <>
      <Header className="SLHeader" />
      {submitError !== "" ? submitError : ""}
      <form className="logInForm" onSubmit={handleSubmit}>
        <ButtonGroupContainer status="client" style={{ width: "35rem" }} />
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

        <WordsBetweenlines text="أو سجل الدخول باستخدام" />
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
          لست عضوًا؟ <Link to="/signup">إنشاء حساب</Link>
        </p>
      </form>
    </>
  );
}
