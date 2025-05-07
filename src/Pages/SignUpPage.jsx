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
import ClientSignup from "../Components/ClientSignup";
import { Link } from "react-router-dom";
import AccountingFirmSignUp from "../Components/AccountingFirmSignUp";
import Footer from "../Components/Footer";

function SignUpPageClient({ status }) {
  return (
    <>
      {" "}
      <div className="grid-container">
        <div className="left">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>
        <div className="right">
          {status === "client" ? <ClientSignup /> : <AccountingFirmSignUp />}
        </div>
      </div>
    </>
  );
}

export default SignUpPageClient;
