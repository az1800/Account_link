import React from 'react';  // Add this import
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
import { Link,useNavigate } from "react-router-dom";
import ButtonGroupContainer from "../Components/ButtonGroupContainer";
import Header from "./Header";
import WordsBetweenlines from "../Components/WordsBetweenlines";
import {validatePassword,validateEmail} from "../helperFunctions/ValidateInput";
import { useRef,useState } from 'react';
import { adminLoginData } from '../helperFunctions/SendLoginData';
export default function AdminLogin() {
     const password = useRef();
    const [passwordErrorMessage,setPassworeErrorMessage]= useState('');
      const [submitError , setSubmitError] = useState('');
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

 function handleEmailErrorMessage(){
    const emailErrorMsg= validateEmail(email.current.value,'En');
    setemailErrorMessage(emailErrorMsg);
  }

   async function handleSubmit(e){
    e.preventDefault();
    const response = await adminLoginData(email.current.value,password.current.value,"admin");
    
if(response==='200'){

  navigate('/AdminPage');
}

else{
  setSubmitError( <div style={{color:'red'}}><p>Email or Password is Wrong !</p></div>);
}

}



  return (
    <>
      <Header className="SLHeader" />
      {(submitError !==''? submitError : '')}

      <form className="logInForm" onSubmit={handleSubmit}>
        <ButtonGroupContainer status="Admin" style={{ width: "35rem" }} />
        <h1>Welcome back!</h1>
        <p>Enter your Credentials to access your account</p>
        <MDBInput ref={email} label="Email address" id="form1Example1" type="email"  onBlur={handleEmailErrorMessage}  />
                                {emailErrorMessage&& <p style={{ color: 'red', textAlign: 'right' }}>{emailErrorMessage}</p>}
       
        
        <MDBInput ref={password} label="Enter your Password" id="form1" type="password"  onBlur={handlePassworErrorMessage}  />
                {passwordErrorMessage&& <p style={{ color: 'red', textAlign: 'right' }}>{passwordErrorMessage}</p>}
        <MDBCheckbox id="form1Example3" label="Remember me" defaultChecked />
        <MDBRow className="mb-4">
          <MDBCol className="d-flex justify-content-center"></MDBCol>
          <MDBCol style={{ width: 155 }}></MDBCol>
        </MDBRow>

        <MDBBtn type="submit" className="mb-4" block>
          Sign in
        </MDBBtn>
      </form>
    </>
  );
}