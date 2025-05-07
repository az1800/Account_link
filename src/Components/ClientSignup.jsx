import React from 'react';  // Add this import
import "../ComopnentsCss/clientLogin.css";
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
import { Link,useNavigate } from "react-router-dom";
import Header from "./Header";
import {validatePassword,validateEmail} from "../helperFunctions/ValidateInput";
import { useRef,useState } from 'react';
import { userRegisterData } from '../helperFunctions/SendLoginData';
function ClientSignup() {
  const password = useRef();
    const [passwordErrorMessage,setPassworeErrorMessage]= useState('');
    const phoneNumber= useRef();
    const name = useRef();
      const navigate = useNavigate();
    
  const [submitError , setSubmitError] = useState('');

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
    const response = await userRegisterData(email.current.value,password.current.value,name.current.value,phoneNumber.current.value);
    
if(response==='200'){

  navigate('/');
}
else{
  setSubmitError( <div style={{color:'red'}}><p>Email  already exists!</p></div>);
}

}


  return (
    <>
          {(submitError !==''? submitError : '')}
      <Header className="SLHeader" />
      <form className="signUpForm" onSubmit={handleSubmit}>
        <ButtonGroupContainer status="client" pageKind="signUp" />
        <h1>Get Started Now</h1>
        <MDBInput label="Enter your Name" id="form1" type="text"  required ref={name}/>
        <MDBInput label="Enter your Phone Number" id="form1" type="text"  required ref={phoneNumber}/>
          <MDBInput ref={email} label="Enter your Email" id="form1Example1" type="email"  onBlur={handleEmailErrorMessage}  />
                                                {emailErrorMessage&& <p style={{ color: 'red', textAlign: 'right' }}>{emailErrorMessage}</p>}
        <MDBInput ref={password} label="Enter your Password" id="form1" type="text"  onBlur={handlePassworErrorMessage}  />
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
          Have an Account?
          <Link to="/Login-client">Log in</Link>
        </p>
      </form>
    </>
  );
}

export default ClientSignup;
