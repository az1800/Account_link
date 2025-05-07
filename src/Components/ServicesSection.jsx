import { useState, useEffect } from "react";
import Card from "./Card";
import Category from "./Category";
import FilterSection from "./FilterSection";
import Pagination from "./Pagination";
import AddService from "./AddService";
import { Search } from "lucide-react";
import { displayFirmService } from "../helperFunctions/PostService";

const categories = [
  { name: "Category", items: ["All", "Price", "Rating", "Favorited"] },
  { name: "Stock Status", items: ["In Stock", "Out of Stock"] },
];

function ServicesSection({ id }) {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch services from API
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await displayFirmService(id);
        if (response.data) {
          setServices(response.data); // ✅ Store received data in state
        } else {
          console.warn("No services found in response");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchServices();
  }, [id]);

  // Adjust cards per page based on screen size
  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth < 768 ? 3 : 4);
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Pagination Logic
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = services.slice(firstCardIndex, lastCardIndex);
  const totalCards = services.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-[78rem] mx-auto">
      {/* Main Layout */}
      <div className="flex flex-col justify-center md:flex-row gap-5 mt-5">
        {/* Sidebar (Filters) */}
        <div className="w-full md:w-1/3">
          <FilterSection>
            <Category categories={categories} />
            <button
              className="bg-[rgba(91,184,255,1)] text-[2rem] font-montserrat text-[white] mt-4 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              Add Service
            </button>
            {isOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                <div className="relative bg-white rounded-lg px-6 pb-6 max-w-lg w-full">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-8 text-2xl text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                  <AddService status="add" firmId={id} />
                </div>
              </div>
            )}
          </FilterSection>
        </div>

        {/* Services Display */}
        <div className="w-full md:w-3/4">
          {/* Search Bar */}
          <form className="hidden lg:block mb-[2rem]">
            <div className="relative">
              <input
                className="w-[99%] py-3 px-2 pl-10 rounded-full border text-sm text-black"
                placeholder="Search for a Service"
              />
              <button
                className="absolute top-1.5 right-3 flex items-center rounded-full bg-[rgba(91,184,255,1)] py-2.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <Search className="mr-2 w-4 h-4 text-white" />
                Search
              </button>
            </div>
          </form>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCards.length > 0 ? (
              currentCards.map((service) => (
                <Card
                  key={service._id}
                  state="product"
                  product={service}
                  profilePic={
                    `${process.env.REACT_APP_API_BASE_URL}` + service.image
                  }
                  serviceID={service._id}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No services available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center md:justify-end mt-5">
        <Pagination
          pagenumbers={pageNumbers}
          setPageNumber={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default ServicesSection;
