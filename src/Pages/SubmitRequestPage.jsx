import { Link,useLocation } from "react-router-dom";
import Header from "../Components/Header";
import logo from "../Assets/logo.png";
import RequestForm from "../Components/RequestForm";
import "../ComopnentsCss/submitRequestPage.css";
import { useNavigate } from "react-router-dom";


function SubmitRequestPage() {
  const location = useLocation();
  const { serviceID } = location.state || {};


  return (
    <>
      <Header className={"ResponsiveHeader"} />
      <div className="grid-container">
        <div className="left2">
          <RequestForm  serviceID={serviceID}/>
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

export default SubmitRequestPage;
