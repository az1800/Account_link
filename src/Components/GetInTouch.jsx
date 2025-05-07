import { MDBBtn, MDBInputGroup } from "mdb-react-ui-kit";
import "../ComopnentsCss/getInTouch.css";
import { useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
function GetInTouch() {
  const { language } = useContext(LanguageContext);
  return (
    <div className={`GetInTouchSection${language === "En" ? "" : "-Ar"}`}>
      <div>
        <h1>{language === "En" ? "Get in Touch" : "تواصل معنا"}</h1>
        <p>
          {language === "En"
            ? "To become partner and provide service as accountants"
            : "كن شريكًا وقدم خدماتك كمحاسب"}
        </p>
      </div>
      <div>
        {language === "En" ? (
          <MDBInputGroup className="btnGroup">
            <input
              type="text"
              className="text-black"
              placeholder="Enter Your Email"
            />
            <MDBBtn color="dark" className="">
              Subscribe
            </MDBBtn>
          </MDBInputGroup>
        ) : (
          <MDBInputGroup className="btnGroup">
            <MDBBtn color="dark" className="">
              اشترك
            </MDBBtn>
            <input
              type="text"
              className="text-black"
              placeholder="ادخل بريدك الاكتروني"
              style={{ textAlign: "right" }}
            />
          </MDBInputGroup>
        )}
      </div>
    </div>
  );
}

export default GetInTouch;
