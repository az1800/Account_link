import { useEffect, useState } from "react";
import {passwordReset,validateOTP,sendNewPass} from "../helperFunctions/ResetPass";
import { useNavigate } from "react-router-dom";
export default  function ResetPassword() {
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [email, setEmail] = useState("");
  const [otp,setOtp] = useState();
const [error,setError] = useState();
const [OTPcorrect,setOTPcorrect] = useState(false);
const [newPassword,setNewPassword] = useState();
const [CnewPassword,setCNewPassword] = useState();
const nav =useNavigate();

  const sendEmail = async (e) => {
    e.preventDefault();
const res = await passwordReset(email);
if(res==="200"){
    setOtpSent(true);
    setTimer(300); 
}
else if(res==="404"){
setError("This email is not exists");
}
else{
    setError("Something went wrong!");
}
  };

const validate = async (e) => {
    e.preventDefault();
const res = await validateOTP(otp,email);
if(res==="200"){
    setOTPcorrect(true);
}
else if(res==="404"){
setError("The OTP TimedOut");
}
else if(res==="400"){console.log("i am here3");
    setError("The OTP Wrong!");
}
  };
  const storeNewPass = async (e) => {
    e.preventDefault();
const res = await sendNewPass(email,newPassword,CnewPassword);
if(res==="200"){
    console.log("ok"); 
  nav('/');
    
}
else if(res==="404"){
setError("This email is not exists");
}
else if(res==="400"){
    setError("Password does not match!");
}
  };
  

  useEffect(() => {
    let timeout;
    if (otpSent && timer > 0) {
      timeout = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [otpSent, timer]);
storeNewPass
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 text-red-600">{!otpSent? error:""}</h1>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 ">Reset Password</h1>
        {!OTPcorrect&&otpSent && (
          <h3 className="text-center text-gray-700 mb-4">
            Time remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
          </h3>
        )}
        {!otpSent &&<form className="space-y-4" onSubmit={sendEmail}>
          {!otpSent && (
            <input required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}


          <input required
            type="submit"
            value="Submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          />
        </form>}
        {!OTPcorrect&&otpSent&&<form className="space-y-4" onSubmit={validate}>
          

          {otpSent && (
            <input required
              type="text"
              onChange={(e)=>setOtp(e.target.value)}
              placeholder="Enter your OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input required
            type="submit"
            value="Submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          />
        </form>}
        {OTPcorrect&&<form className="space-y-4" onSubmit={storeNewPass}>
          

          
            <input required
              type="text"
              onChange={(e)=>setNewPassword(e.target.value)}
              placeholder="Enter your New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        <input required
              type="text"
              onChange={(e)=>setCNewPassword(e.target.value)}
              placeholder="Confirm The Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        
 
          <input required
            type="submit"
            value="Submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          />
        </form>}
      </div>
    </div>
  );
}
