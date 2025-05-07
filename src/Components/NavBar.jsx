import { Link } from "react-router-dom";
import { LanguageContext } from "../Contexts/LanguageContext";
import { useContext } from "react";
function NavBar() {
  const { language } = useContext(LanguageContext);
  // {language==="En"?"English text":"Arabic Text"}

  const links = [
    {
      to: "/",
      en: "Home",
      ar: "الرئيسية",
    },
    {
      to: "/AboutUsPage",
      en: "About us",
      ar: "من نحن",
    },
    {
      to: "/ContactUsPage",
      en: "Contact us",
      ar: "تواصل معنا",
    },
    
    
  ];
  const orderedLinks = language === "En" ? links : links.reverse();
  return (
    <span className="headerstuff">
      {orderedLinks.map((link, index) => (
        <Link to={link.to} key={index}>
          <b>{language === "En" ? link.en : link.ar}</b>
        </Link>
      ))}
    </span>
  );
}

export default NavBar;
