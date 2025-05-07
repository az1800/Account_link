import { Link, useNavigate } from "react-router-dom";
import "../ComopnentsCss/HomePageBody.css";
import { MDBBtn } from "mdb-react-ui-kit";
import newspapers from "../Assets/newspaper.png";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
import NavBar from "./NavBar";
import { UserDataContext } from "../helperFunctions/UserContext";
function HomePageBody() {
  const navigate = useNavigate();
  const[logged,setLogged] = useState(false);

  const { language } = useContext(LanguageContext);
  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  const { userData } = useContext(UserDataContext);
  useEffect(() => {
    if (userData) {

      setLogged(true);    
}
  }, [userData]);


  return (
    <div
      style={{
        backgroundColor: "rgba(91, 184, 255, 0.5)",
      }}
    >
      <div className="PageBody">
        <NavBar />

        <div className={`firstStatement${language === "En" ? "" : "-Ar"}`}>
          <b>
            {language === "En"
              ? "Connect With Trusted Accountants"
              : "تواصل مع محاسبين موثوقين"}
          </b>
        </div>
        <b className={`secondStatement${language === "En" ? "" : "-Ar"}`}>
          {language === "En"
            ? "Streamline your financial management with seamless connections between businesses and accounting firms. "
            : ".قم بإدارة أموالك بكل سهولة وكفاءة من خلال الربط بين الشركات ومكاتب المحاسبة"}
        </b>
       { <div className={`twoButtons${language === "En" ? "" : "-Ar"}`}>
          
          <MDBBtn
            type="submit"
            className="btns"
            rounded
            onClick={() => handleNavigation("firmsPage")}
          >
            {language === "En"
              ? "Get Financial Solutions"
              : "احصل على حلول محاسبية"}
          </MDBBtn>
         {!logged&& <MDBBtn
            type="submit"
            className="btns"
            outline
            rounded
            onClick={() => handleNavigation("signup-accountingFirm")}
          >
            {language === "En"
              ? "Join as an Accounting Firm"
              : "انضم كمكتب محاسبي"}
          </MDBBtn>}
        </div>}
{!logged&&
        <div className={`joinAsAnACCDiv${language === "En" ? "" : "-Ar"}`}>
          <b className="joinAsAnACCText">
            {language === "En"
              ? "Join as an Accounting Firm"
              : "انضم كمكتب محاسبي"}
          </b>

          <MDBBtn
            type="submit"
            className="joinAsAnACCBtn"
            onClick={() => handleNavigation("signup-accountingFirm")}
          >
            {language === "En" ? "Sign up" : "تسجيل"}
          </MDBBtn>
        </div>}
      </div>
      {/* <img src={newspapers} alt="" style={{ height: "400px" }} /> */}
    </div>
  );
}

export default HomePageBody;
