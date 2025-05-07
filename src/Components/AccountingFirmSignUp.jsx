import React from 'react';  // This should be at the top
import { MDBBtn, MDBCheckbox, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import ButtonGroupContainer from "../Components/ButtonGroupContainer";
import Header from "./Header";
import WordsBetweenlines from "../Components/WordsBetweenlines";
import { Link,useNavigate } from "react-router-dom";
import {validatePassword,validateEmail} from "../helperFunctions/ValidateInput";
import { useRef,useState } from 'react';
import { firmRegisterData } from '../helperFunctions/SendLoginData';
function AccountingFirmSignUp() {
  const password = useRef();
const name = useRef();
const cr = useRef();
const cd = useRef();
const address = useRef();
  const [submitError , setSubmitError] = useState('');


const [passwordErrorMessage,setPassworeErrorMessage]= useState('');
 const navigate = useNavigate();
function handlePassworErrorMessage(){
const passwordErrorMsg = validatePassword(password.current.value,'En');
setPassworeErrorMessage(passwordErrorMsg);
}

const email = useRef();
const [emailErrorMessage,setemailErrorMessage]= useState('');
function handleEmailErrorMessage(){
  const emailErrorMsg= validateEmail(email.current.value,'En');
  setemailErrorMessage(emailErrorMsg);
}

async function handleSubmit(e){
    e.preventDefault();
    const response = await firmRegisterData(email.current.value,password.current.value,cr.current.value,address.current.value,cd.current.value,name.current.value);
    
if(response==='200'){

  navigate('/');
}
else{
  setSubmitError( <div style={{color:'red'}}><p>Email  already exists!</p></div>);
}
}

  return (
    <>
      <Header className="SLHeader" />
      <form className="signUpForm" onSubmit={handleSubmit}>
      {(submitError !==''? submitError : '')}

        <ButtonGroupContainer status="accountingFirm" pageKind="signUp" />
        <h1>Get Started Now</h1>
        <MDBInput label="Enter your Firm's address" id="form1" type="text" required  ref={address}/>
        <MDBInput label="Enter name of the firm" id="form1" type="text" required ref={name}/>
        <MDBInput label="commercial register" id="form1" type="text" required ref={cr}/>
        <MDBInput label="Enter Certification Details" id="form1" type="text" required ref={cd}/>
<MDBInput ref={email} label="Enter your Firm's email address" id="form1Example1" type="email"  onBlur={handleEmailErrorMessage}  />
                {emailErrorMessage&& <p style={{ color: 'red', textAlign: 'right' }}>{emailErrorMessage}</p>}        <MDBInput ref={password} label="Enter your Password" id="form1" type="text"  onBlur={handlePassworErrorMessage}  />
        {passwordErrorMessage&& <p style={{ color: 'red', textAlign: 'right' }}>{passwordErrorMessage}</p>}
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="I agree to the terms & policy"
        />
        <MDBBtn>Sign up</MDBBtn>
        <WordsBetweenlines text="Or sign up with" />
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
          Have an Acoount?
          <Link to="/Login-accountingFirm">Log in</Link>
        </p>
      </form>
    </>
  );
}

export default AccountingFirmSignUp;