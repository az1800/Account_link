import React from 'react';  // This should be at the top
import { MDBBtn, MDBCheckbox, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import ButtonGroupContainer from "../Components/ButtonGroupContainer";
import Header from "./Header";
import WordsBetweenlines from "../Components/WordsBetweenlines";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword, validateEmail } from "../helperFunctions/ValidateInput";
import { useRef, useState } from 'react';
import { firmRegisterData } from '../helperFunctions/SendLoginData';

function AccountingFirmSignUp() {
  const password = useRef();
  const name = useRef();
  const cr = useRef();
  const cd = useRef();
  const address = useRef();

  const [passwordErrorMessage, setPassworeErrorMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

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
    const response = await firmRegisterData(
      email.current.value,
      password.current.value,
     
      cr.current.value,
      address.current.value,
      cd.current.value,
      name.current.value
    );

    if (response==='200') {
      navigate('/');
    } else {
      setSubmitError(<div style={{ color: 'red' }}><p>البريد الإلكتروني موجود مسبقا !</p></div>);
    }
  }

  return (
    <>
      <Header className="SLHeader" />
      <form className="signUpForm" onSubmit={handleSubmit}>
        {submitError !== '' ? submitError : ''}

        <ButtonGroupContainer status="accountingFirm" pageKind="signUp" />
        <h1>ابدأ الآن</h1>
        <MDBInput label="أدخل عنوان شركتك" id="form1" type="text" required ref={address} />
        <MDBInput label="أدخل اسم الشركة" id="form1" type="text" required ref={name} />
        <MDBInput label="السجل التجاري" id="form1" type="text" required ref={cr} />
        <MDBInput label="أدخل تفاصيل الشهادة" id="form1" type="text" required ref={cd} />
        <MDBInput ref={email} label="البريد الإلكتروني" id="form1Example1" type="email" onBlur={handleEmailErrorMessage} />
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

export default AccountingFirmSignUp;