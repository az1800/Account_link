// import { useEffect, useState } from "react";
// import Category from "../Components/Category";
// import FilterSection from "../Components/FilterSection";
// import FirmCard from "../Components/FirmCard";
// import Header from "../Components/Header";
// import Pagination from "../Components/Pagination";
// import { useNavigate } from "react-router-dom";
// import { SendRequest } from "../helperFunctions/SendRequestForFirmsListr"; // Adjust the import path
// import { sendRequestByName } from "../helperFunctions/SendRequestForFirmsListr";
// import { useLocation } from "react-router-dom";

// function FirmsPage() {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [cardsPerPage, setCardsPerPage] = useState(4);
//   const [accountingFirms, setAccountingFirms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const firmName = queryParams.get("firmName");
//   if (queryParams.has("firmName")) {
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const data = await sendRequestByName(firmName);

//           if (data !== "404") {
//             console.log(data.data);
//             const firmsArray = Array.isArray(data.data) ? data.data : [data];

//             setAccountingFirms(firmsArray);
//           } else {
//             setError("Failed to fetch firms.");
//           }
//         } catch (error) {
//           setError(
//             "An error occurred while fetching dataxxxxxxxx.+" + error.message
//           );
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }, []);
//   } else {
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const data = await SendRequest();

//           if (data !== "404") {
//             const firmsArray = Array.isArray(data.data) ? data.data : [data];

//             setAccountingFirms(firmsArray);
//           } else {
//             setError("Failed to fetch firms.");
//           }
//         } catch (error) {
//           setError("An error occurred while fetching data.");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }, []);
//   }

//   /*
//  useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await SendRequest();

//         if (data !== '404' ) {
//           const firmsArray = Array.isArray(data.data) ? data.data : [data];

//   setAccountingFirms(firmsArray);
//         } else {
//           setError("Failed to fetch firms.");
//         }
//       } catch (error) {
//         setError("An error occurred while fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);
// */

//   useEffect(() => {
//     const updateCardsPerPage = () => {
//       setCardsPerPage(window.innerWidth < 768 ? 3 : 4);
//     };

//     updateCardsPerPage();
//     window.addEventListener("resize", updateCardsPerPage);

//     return () => window.removeEventListener("resize", updateCardsPerPage);
//   }, []);

//   // Ensure currentCards is initialized properly
//   const lastCardIndex = currentPage * cardsPerPage;
//   const firstCardIndex = lastCardIndex - cardsPerPage;
//   const currentCards =
//     accountingFirms.length > 0
//       ? accountingFirms.slice(firstCardIndex, lastCardIndex)
//       : [];

//   // Ensure we don’t render before data is ready
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (accountingFirms.length === 0) {
//     return <div>No firms found.</div>;
//   }
//   return (
//     <>
//       <Header />
//       <div className="flex max-w-[77%] mx-auto mt-10 gap-10 flex-row flex-wrap md:flex-col">
//         <div className="w-full md:w-auto">
//           <FilterSection>
//             <Category categories={[]} />
//           </FilterSection>
//         </div>
//         <div className="flex flex-col gap-3 w-full md:w-auto">
//           {currentCards.map((firm, index) => {
//             console.log(firm.image);
//             return (
//               <FirmCard
//                 key={firm._id || index}
//                 title={firm.firmName || "Unknown Firm"}
//                 description={firm.description || "No description available"}
//                 image={
//                   `${process.env.REACT_APP_API_BASE_URL}" + firm.image ||
//                   `${process.env.REACT_APP_API_BASE_URL}/uploads/profile-images/DefualtUserPicture.jpg"
//                 } //
//                 isVerified={false || false}
//                 onClick={
//                   () => navigate(`/FirmProfile/${firm._id}`) //to be edited
//                 }
//               />
//             );
//           })}
//         </div>
//         <div className="w-full flex justify-center md:justify-end mt-5">
//           <Pagination
//             pagenumbers={
//               accountingFirms.length > 0
//                 ? [
//                     ...Array(
//                       Math.ceil(accountingFirms.length / cardsPerPage)
//                     ).keys(),
//                   ].map((i) => i + 1)
//                 : [1]
//             }
//             setPageNumber={setCurrentPage}
//             currentPage={currentPage}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default FirmsPage;
import { useEffect, useState } from "react";
import Category from "../Components/Category";
import FilterSection from "../Components/FilterSection";
import FirmCard from "../Components/FirmCard";
import Header from "../Components/Header";
import Pagination from "../Components/Pagination";
import { useNavigate } from "react-router-dom";
import { SendRequest } from "../helperFunctions/SendRequestForFirmsListr"; // Adjust the import path
import { sendRequestByName } from "../helperFunctions/SendRequestForFirmsListr";
import { useLocation } from "react-router-dom";

function FirmsPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [accountingFirms, setAccountingFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(localStorage.getItem("filters")) ?? {}
  );
  console.log("====");
  console.log(selectedFilters);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const firmName = queryParams.get("firmName");

  // Fetch firms by name if firmName parameter exists
  if (queryParams.has("firmName")) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await sendRequestByName(firmName);

          if (data !== "404") {
            console.log(data.data);
            const firmsArray = Array.isArray(data.data) ? data.data : [data];

            setAccountingFirms(firmsArray);
          } else {
            setError("Failed to fetch firms.");
          }
        } catch (error) {
          setError(
            "An error occurred while fetching dataxxxxxxxx.+" + error.message
          );
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);
  } else {
    // Fetch all firms if no firmName parameter
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await SendRequest();

          if (data !== "404") {
            const firmsArray = Array.isArray(data.data) ? data.data : [data];

            setAccountingFirms(firmsArray);
          } else {
            setError("Failed to fetch firms.");
          }
        } catch (error) {
          setError("An error occurred while fetching data.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);
  }

  // Fetch filter criteria
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/client/filterCriteria`
        );
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Error fetching filter criteria:", error);
      }
    };

    fetchCriteria();
  }, []);

  // Handle applying filters
  const handleApplyFilters = async () => {
    try {
      setLoading(true);
      console.log("received filters", selectedFilters, firmName);
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/client/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firmName, selectedFilters }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data !== "404") {
        console.log(data);
        const firmsArray = Array.isArray(data.data) ? data.data : [data];
        setAccountingFirms(firmsArray);
        setCurrentPage(1);
      } else {
        setError("Failed to fetch firms.");
      }
      localStorage.setItem("filters", JSON.stringify(selectedFilters));
    } catch (error) {
      console.error("Error applying filters:", error);
      setError("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  // Update cards per page based on window size
  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth < 768 ? 3 : 4);
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Calculate pagination
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards =
    accountingFirms.length > 0
      ? accountingFirms.slice(firstCardIndex, lastCardIndex)
      : [];

  // Loading, error, and empty state handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (accountingFirms.length === 0) {
    return <div>No firms found.</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-col md:flex-row max-w-[86%] mx-auto mt-10 gap-10 flex-wrap">
        <div className="w-full md:w-auto">
          <FilterSection>
            <Category
              categories={categories}
              onFilterChange={handleFilterChange}
            />
            <button
              className="bg-[rgba(91,184,255,1)] text-[2rem] font-montserrat text-[white] mt-4 rounded-md"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </FilterSection>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-auto">
          {firmName && <h3>Results for "{firmName}":</h3>}
          {currentCards.map((firm, index) => {
            return (
              <FirmCard
                key={firm._id || index}
                title={firm.firmName || "Unknown Firm"}
                description={firm.description || "No description available"}
                image={
                  `${process.env.REACT_APP_API_BASE_URL}` + firm.image ||
                  `${process.env.REACT_APP_API_BASE_URL}/uploads/DefualtUserPicture.jpg`
                }
                isVerified={false || false}
                onClick={
                  () => navigate(`/FirmProfile/${firm._id}`) //to be edited
                }
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center md:justify-end mt-5">
          <Pagination
            pagenumbers={
              accountingFirms.length > 0
                ? [
                    ...Array(
                      Math.ceil(accountingFirms.length / cardsPerPage)
                    ).keys(),
                  ].map((i) => i + 1)
                : [1]
            }
            setPageNumber={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default FirmsPage;
