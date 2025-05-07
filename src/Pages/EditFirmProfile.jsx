import React, { useEffect, useState } from "react"; // Ensure React, useEffect, and useState are imported
import Header from "../Components/Header";
import placeHolder from "../Assets/image.png";
import Card from "../Components/Card";
import ServicesSection from "../Components/ServicesSection";
import { Link, useParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { SendRequestForFirmProfile2 } from "../helperFunctions/SendRequestForFirmsListr";
function FirmProfilePage() {
  const { id } = useParams();
  const [firm, setFirm] = useState(null); // State to store the firm data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch firm data when the component mounts or when `id` changes
    const fetchFirmData = async () => {
      try {
        const data = await SendRequestForFirmProfile2(id); // Await the result
        //console.log(data.firmName+"___ this is the firm name @!!!!"+data.description);
        setFirm(data); // Update state with the fetched data
      } catch (error) {
        setError("Failed to fetch firm data"); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchFirmData(); // Call the async function
  }, [id]); // Dependency array: re-run effect if `id` changes

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!firm) {
    return <div>Firm not found</div>; // Handle case where firm data is not available
  }

  return (
    <>
      <Header />
      <div className="max-w-[80rem] mx-auto px-4">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-[3rem] md:text-[5rem] my-5 font-montserrat">
            {firm.firmName}
          </h1>
          <div className="flex items-center gap-2">
            <Link to="/ChatPage/AcountingFirm">
              <button
                className="bg-[rgba(91,184,255,1)] text-white h-10 px-2 text-[1rem] 
                      font-montserrat rounded-md flex items-center justify-center"
              >
                <MessageCircle className="m-0 p-0" />
              </button>
            </Link>

            <Link to="/EditFirmProfile/update">
              <button
                className="bg-[rgba(91,184,255,1)] text-white h-10 w-[7rem] 
                      text-[1rem] font-montserrat rounded-md"
              >
                Edit Profile
              </button>
            </Link>
            <Link to="/FirmRequests">
              <button
                className="bg-[rgba(91,184,255,1)] text-white h-10 w-[7rem] 
                      text-[1rem] font-montserrat rounded-md"
              >
                Requests
              </button>
            </Link>
          </div>
        </div>
        {/* Responsive Layout */}
        <div className="flex flex-col md:flex-row gap-5">
          <Card
            state={"profile"}
            profilePic={`${process.env.REACT_APP_API_BASE_URL}` + firm.image}
            isVerified={true}
          />
          <p className="text-lg ">{firm.description}</p>
        </div>
      </div>
      <ServicesSection id={id} />
    </>
  );
}

export default FirmProfilePage;
