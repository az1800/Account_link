import React, { useContext, useEffect, useRef, useState } from "react";
import arrow from "../Assets/arrow.svg";
import "../ComopnentsCss/FAQsSection.css";
import { LanguageContext } from "../Contexts/LanguageContext";
import { useMediaQuery } from "react-responsive";
function FAQCard({ Title, Subtitle }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useContext(LanguageContext);
  // {language==="En"?"English text":"Arabic Text"}
  // Use Intersection Observer to detect visibility of the card
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true); // Set to visible when the card enters the viewport
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current); // Clean up observer on component unmount
      }
    };
  }, []);

  return (
    <div className={`FAQCard ${isVisible ? "visible" : ""}`} ref={cardRef}>
      {isMobile ? (
        <img
          src={arrow}
          alt=""
          style={{
            // marginLeft: `${language === "En" ? "10px" : "27rem"}`,
            marginLeft: `${language === "En" ? "10px" : "8.5rem"}`,
            marginTop: "10px",
            transform: `${language === "En" ? "" : "rotate(180deg)"}`,
          }}
        />
      ) : (
        <img
          src={arrow}
          alt=""
          style={{
            marginLeft: `${language === "En" ? "10px" : "27rem"}`,
            marginTop: "10px",
            transform: `${language === "En" ? "" : "rotate(180deg)"}`,
          }}
        />
      )}

      <p
        style={{
          marginTop: "-1.4rem",
          marginLeft: `${language === "En" ? "1.4rem" : "0"}`,
          marginRight: `${language === "En" ? "0" : "1.4rem"}`,
          textAlign: `${language === "En" ? "left" : "right"}`,
        }}
      >
        <b>{Title}</b>
      </p>
      <p
        style={{
          marginLeft: `${language === "En" ? "1.4rem" : "0"}`,
          marginRight: `${language === "En" ? "0" : "1.4rem"}`,
          fontSize: "14px",
          textAlign: `${language === "En" ? "left" : "right"}`,
        }}
      >
        {Subtitle}
      </p>
    </div>
  );
}

export default FAQCard;
