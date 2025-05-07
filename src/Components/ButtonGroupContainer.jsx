import { MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";
import "../ComopnentsCss/SignUpPageClient.css";
import { useNavigate } from "react-router-dom";

function ButtonGroupContainer({ status, pageKind = "login", style }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${pageKind}-${path}`);
  };

  return (
    <MDBBtnGroup className="ButtonGroupContainer" shadow="0" style={style}>
      <MDBBtn
        color={status === "client" ? "secondary" : ""}
        onClick={() => handleNavigation("client")}
      >
        Client
      </MDBBtn>

      {pageKind === "signUp" ? null : (
        <MDBBtn
          color={status === "Admin" ? "secondary" : ""}
          onClick={() => handleNavigation("Admin")}
        >
          Admin
        </MDBBtn>
      )}

      <MDBBtn
        color={status === "accountingFirm" ? "secondary" : ""}
        onClick={() => handleNavigation("accountingFirm")}
      >
        Accounting Firm
      </MDBBtn>
    </MDBBtnGroup>
  );
}

export default ButtonGroupContainer;
