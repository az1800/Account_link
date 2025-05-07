import React from 'react';  // Add this import
import "../ComopnentsCss/SignUpPageClient.css";
import Logo from "../Assets/logo.png";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCheckbox,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import ButtonGroupContainer from "../Components/ButtonGroupContainer";
import WordsBetweenlines from "../Components/WordsBetweenlines";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { validatePassword, validateEmail } from "../helperFunctions/ValidateInput";
import { useRef, useState } from 'react';
import { userRegisterData } from '../helperFunctions/SendLoginData';

function ClientSignup() {
  const password = useRef();
  const [passwordErrorMessage, setPassworeErrorMessage] = useState('');
  const phoneNumber = useRef();
  const name = useRef();
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState('');

  function handlePassworErrorMessage() {
    const passwordErrorMsg = validatePassword(password.current.value, 'En');
    setPassworeErrorMessage(passwordErrorMsg);
  }

  const email = useRef();
  const [emailErrorMessage, setemailErrorMessage] = useState('');

  function handleEmailErrorMessage() {
    const emailErrorMsg = validateEmail(email.current.value, 'En');
    setemailErrorMessage(emailErrorMsg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await userRegisterData(
      email.current.value,
      password.current.value,
    
      name.current.value,
      phoneNumber.current.value
    );

    if (response==='200') {
      navigate('/');
    } else {
      setSubmitError(<div style={{ color: 'red' }}><p>البريد الإلكتروني أو كلمة المرور غير صحيحة!</p></div>);
    }
  }

  return (
    <>
      <Header className="SLHeader" />
      <form className="signUpForm" onSubmit={handleSubmit}>
        {submitError !== '' ? submitError : ''}

        <ButtonGroupContainer status="client" pageKind="signUp" />
        <h1>ابدأ الآن</h1>
        <MDBInput label="أدخل اسمك" id="form1" type="text" required ref={name} />
        <MDBInput label="أدخل رقم هاتفك" id="form1" type="text" required ref={phoneNumber} />
        <MDBInput ref={email} label="أدخل بريدك الإلكتروني" id="form1Example1" type="email" onBlur={handleEmailErrorMessage} />
        {emailErrorMessage && <p style={{ color: 'red', textAlign: 'right' }}>{emailErrorMessage}</p>}
        <MDBInput ref={password} label="أدخل كلمة المرور" id="form1" type="text" onBlur={handlePassworErrorMessage} />
        {passwordErrorMessage && <p style={{ color: 'red', textAlign: 'right' }}>{passwordErrorMessage}</p>}
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="أوافق على الشروط والسياسة"
        />
        <MDBBtn type="submit">التسجيل</MDBBtn>
        <WordsBetweenlines text="أو سجل باستخدام" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <MDBBtn
            color="link"
            style={{
              border: "2px solid rgba(0, 0, 0, 0.5)",
              flex: "1",
              marginRight: "1rem",
            }}
          >
            {" "}
            <MDBIcon fab icon="google" style={{ color: "black" }} />
          </MDBBtn>
          <MDBBtn
            color="link"
            style={{ border: "2px solid rgba(0, 0, 0, 0.5)", flex: "1" }}
          >
            <MDBIcon fab icon="apple" style={{ color: "black" }} />{" "}
          </MDBBtn>
        </div>
        <p>
          هل لديك حساب؟ <Link to="/Login">تسجيل الدخول</Link>
        </p>
      </form>
    </>
  );
}

export default ClientSignup;