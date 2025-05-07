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
import WordsBetweenlines from "../Components/WordsBetweenlines";
import ClientLogin from "../Components/ClientLogin";
import AdminLogin from "../Components/AdminLogin";
import AccountingFirmLogIn from "../Components/AccountingFirmLogIn";
import ClientLoginAr from "../Components/ClientLoginAr";
import AdminLoginAr from "../Components/AdminLoginAr";
import AccountingFirmLogInAr from "../Components/AccountingFirmLogInAr";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";

function Login({ status }) {
  const { language } = useContext(LanguageContext);

  return (
    <>
      <div className="grid-container">
        <div className="left2">
          {language === "En" ? (
            <>
              {status === "client" ? (
                <ClientLogin />
              ) : status === "admin" ? (
                <AdminLogin />
              ) : (
                <AccountingFirmLogIn />
              )}
            </>
          ) : (
            <>
              {status === "client" ? (
                <ClientLoginAr />
              ) : status === "admin" ? (
                <AdminLoginAr />
              ) : (
                <AccountingFirmLogInAr />
              )}
            </>
          )}
        </div>

        <div className="right2">
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
