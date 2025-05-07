import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../Assets/headerLogo.svg";
import "../ComopnentsCss/Header.css";
import { LanguageContext } from "../Contexts/LanguageContext";
import { UserDataContext } from "../helperFunctions/UserContext";
import { Search } from "lucide-react";
import LogOut from "../helperFunctions/Logout";
function Header({ className, menuItems }) {
  const { setUserData, userData } = useContext(UserDataContext);
  const isLoggedIn = userData ? true : false;
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const firmName = useRef();
  const Navigate = useNavigate();

  const handleLogOut = async () => {
    setMenuOpen(false);
    localStorage.removeItem("user");
    const logo = await LogOut();
    setUserData(null);
    Navigate('/');
  };

  let userName = <h1></h1>;


  return (
    <header className={`header ${className}`}>
      {/* Logo */}
      <Link to="/">
        <img src={Logo} alt="Logo" className="header-logo" />
      </Link>
      {userName}

      <div className="flex-grow flex justify-center">
        <form
          className="hidden lg:block mb-[-1rem]"
          onSubmit={() => {
            const name = firmName.current.value.trim();
            if (name !== "") {
              Navigate(`/FirmsPage?firmName=${encodeURIComponent(name)}`);
            }
          }}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-5 pl-10 rounded-full border text-sm text-black"
            required
            ref={firmName}
          />
          <Search className="relative left-4 top-[-1.6rem] w-4 h-4 text-black" />
        </form>
      </div>

      {/* Desktop Buttons - Now includes menuItems buttons */}
      <div
        className={`header-buttons ${
          menuOpen ? "hidden" : "flex items-center"
        }`}
      >
        {/* Menu Items as buttons - only displayed in desktop view */}
        <div className="hidden lg:flex mr-4">
          {menuItems?.map(({ item, direction }, index) => (
            <Link key={index} to={direction} className="mdb-btn mx-1">
              {item}
            </Link>
          ))}
        </div>

        {isLoggedIn ? (
          <>
            <Link to="/signup">
              <button className="mdb-btn" onClick={handleLogOut}>
                {language === "En" ? "Log out" : "تسجيل خروج"}
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup-client">
              <button className="mdb-btn">
                {language === "En" ? "Sign up" : "تسجيل"}
              </button>
            </Link>
            <Link to="/login-client">
              <button className="mdb-btn">
                {language === "En" ? "Log in" : "تسجيل دخول"}
              </button>
            </Link>

            <button className="mdb-btn" onClick={toggleLanguage}>
              {language === "En" ? "عربي" : "English"}
            </button>
          </>
        )}
      </div>

      {/* Hamburger Icon */}
      <div
        className={
          className === "SLHeader" ? "SLHeader-icon" : "hamburger-icon"
        }
        onClick={toggleMenu}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {menuOpen && (
        <nav className="mobile-menu">
          <form
            className="md:block mb-[-1rem]"
            onSubmit={() => {
              const name = firmName.current.value.trim();
              if (name !== "") {
                Navigate(`/FirmsPage?firmName=${encodeURIComponent(name)}`);
              }
            }}
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-5 pl-10 rounded-full border text-sm text-black"
              required
              ref={firmName}
            />
            <Search className="relative left-4 top-[-1.6rem] w-4 h-4 text-black" />
          </form>
          <Link onClick={toggleLanguage}>
            {language === "En" ? "عربي" : "English"}
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/signup-client" onClick={handleLogOut}>
                {language === "En" ? "تسجيل خروج" : "log out"}
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup-client" onClick={toggleMenu}>
                Sign up
              </Link>
              <Link to="/login-client" onClick={toggleMenu}>
                Log in
              </Link>
            </>
          )}
          {menuItems?.map(({ item, direction }, index) => (
            <Link key={index} to={direction} onClick={toggleMenu}>
              {item}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
