import FAQCard from "./FAQCard";
import "../ComopnentsCss/FAQsSection.css";
import Pagination from "./Pagination";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";

function FAQsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [faqData, setFaqData] = useState([]); // State to store fetched FAQ data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const { language } = useContext(LanguageContext);

  // Fetch FAQ data from the backend when the component loads
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/faq`,
          {
            method: "GET", // Use GET to retrieve FAQs
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials if needed
          }
        );

        if (response.ok) {
          const data = await response.json(); // Parse the response JSON
          setFaqData(data); // Store the fetched FAQs in state
        } else {
          console.error("Failed to fetch FAQs:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFAQs();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Pagination logic
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = faqData.slice(firstCardIndex, lastCardIndex);
  const totalCards = faqData.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Display loading state while fetching data
  if (loading) {
    return <div>Loading FAQs...</div>;
  }

  // Display message if no FAQs are found
  if (faqData.length === 0) {
    return <div>No FAQs found.</div>;
  }

  return (
    <>
      <h1 className="FAQText">
        {language === "En" ? "FAQ" : "الأسئلة الشائعة"}
      </h1>
      <div className={language === "En" ? "FAQSection" : "FAQSection-Ar"}>
        {currentCards.map((item, index) => (
          <FAQCard
            key={index}
            Title={language === "En" ? item.title : item.titleArabic}
            Subtitle={language === "En" ? item.subtitle : item.subtitleArabic}
          />
        ))}
      </div>
      <Pagination
        pagenumbers={pageNumbers}
        setPageNumber={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default FAQsSection;
