// import { Search } from "lucide-react";
// import { useState, useEffect } from "react";
// import axios from "axios";

// // Configure axios with base URL
// axios.defaults.baseURL = "${process.env.REACT_APP_API_BASE_URL}";

// function ObjTicket() {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const fetchTickets = async () => {
//     try {
//       const response = await axios.get("/api/admin/objection-tickets", {
//         withCredentials: true,
//       });
//       setTickets(response.data.data || []);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching tickets:", err);
//       setError("Failed to fetch tickets");
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const filtered = tickets.filter(
//       (ticket) =>
//         ticket.issueTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         ticket.issueDescription
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())
//     );
//     setTickets(filtered);
//   };

//   if (loading)
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-slate-600">Loading tickets...</div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-red-600">{error}</div>
//       </div>
//     );

//   return (
//     <main className="flex-1 overflow-y-auto h-full ">
//       <div className="mx-auto max-w-4xl p-6 md:p-8 lg:p-10">
//         <div className="mb-4">
//           <span className="mb-2 inline-block rounded-full bg-apple-blueMedium px-3 py-1 text-xs font-medium text-apple-text">
//             Tickets Dashboard
//           </span>
//           <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-3xl">
//             Current Tickets
//           </h1>
//           <p className="mt-2 text-slate-600">
//             Overview of reported issues and service-related tickets
//           </p>
//         </div>
//         {/* </div> */}

//         <div className="w-full">
//           <form className="lg:block mb-[2rem]" onSubmit={handleSearch}>
//             <div className="relative">
//               <input
//                 className="w-[99%] py-3 px-2 pl-10 rounded-full border text-sm text-black"
//                 placeholder="Search for a ticket"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button
//                 className="absolute top-1.5 right-3 flex items-center rounded-full bg-[rgba(91,184,255,1)] py-2.5 px-4 border border-transparent text-center text-sm text-white shadow-sm hover:shadow focus:bg-slate-700"
//                 type="submit"
//               >
//                 <Search className="mr-2 w-4 h-4 text-white" />
//                 Search
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
//           {tickets.map((ticket) => (
//             <div
//               key={ticket.id}
//               className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-sm font-semibold text-slate-900">
//                     {ticket.ticketDetails.issueTitle}
//                   </h3>
//                   <span className="text-xs text-slate-500">
//                     {new Date(
//                       ticket.timestamps.submittedAt
//                     ).toLocaleDateString()}
//                   </span>
//                 </div>

//                 <div className="mb-3">
//                   <span
//                     className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${
//                       ticket.ticketDetails.status === "pending"
//                         ? "bg-orange-100 text-orange-800"
//                         : ticket.ticketDetails.status === "under-review"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                   >
//                     {ticket.ticketDetails.status}
//                   </span>
//                 </div>

//                 <p className="text-sm text-slate-600 line-clamp-3 mb-3 leading-relaxed">
//                   {ticket.issue.description}
//                 </p>

//                 <div className="text-xs text-slate-500 mb-2">
//                   <div>
//                     From:{" "}
//                     <span className="font-medium text-slate-700">
//                       {ticket.ticketDetails.sender?.name || "N/A"}
//                     </span>
//                   </div>
//                   <div>
//                     To:{" "}
//                     <span className="font-medium text-slate-700">
//                       {ticket.ticketDetails.receiver?.name || "N/A"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="text-xs text-slate-500 mb-3">
//                   {ticket.ticketDetails.service && (
//                     <div>
//                       Service:{" "}
//                       <span className="text-slate-700">
//                         {ticket.ticketDetails.service.serviceName}
//                       </span>
//                     </div>
//                   )}
//                   {ticket.ticketDetails.service?.price && (
//                     <div>
//                       Budget:{" "}
//                       <span className="text-slate-700">
//                         ${ticket.ticketDetails.service.price}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {ticket.issue.attachments?.length > 0 && (
//                   <div className="text-xs text-blue-600 underline mb-3">
//                     {ticket.issue.attachments.length} Attachment
//                     {ticket.issue.attachments.length > 1 ? "s" : ""}
//                   </div>
//                 )}

//                 {ticket.issue.resolution && (
//                   <div className="bg-green-50 text-green-800 text-xs p-2 rounded-md mb-3">
//                     <strong>Resolution:</strong> {ticket.issue.resolution}
//                   </div>
//                 )}

//                 <div className="mt-4 flex justify-end space-x-3">
//                   <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-apple-blue border border-apple-blue shadow-sm hover:bg-gray-50">
//                     Respond
//                   </button>
//                   <button className="inline-flex items-center justify-center rounded-md bg-apple-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-apple-blue/90">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default ObjTicket;
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import strings from "../../../Languages/localization";
import LanguageSwitcher from "../LanguageSwitcher";

// Configure axios with base URL
axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}`;

function ObjTicket() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalTickets, setOriginalTickets] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    fetchTickets();

    // Set initial language
    const storedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(storedLanguage);
    strings.setLanguage(storedLanguage);

    // Listen for language change events
    const handleLanguageChange = () => {
      setCurrentLanguage(localStorage.getItem("language") || "en");
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("/api/admin/objection-tickets", {
        withCredentials: true,
      });
      const fetchedTickets = response.data.data || [];
      console.log("Fetched tickets:", fetchedTickets); // Debug line to see ticket structure
      setTickets(fetchedTickets);
      setOriginalTickets(fetchedTickets);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(strings.tickets?.fetchError || "Failed to fetch tickets");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      // If search is empty, reset to original tickets
      setTickets(originalTickets);
      return;
    }

    const filtered = originalTickets.filter(
      (ticket) =>
        ticket.issueTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketDetails?.issueTitle
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        ticket.issueDescription
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        ticket.issue?.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setTickets(filtered);
  };

  // Navigate to ticket details page with the correct ID
  const navigateToDetails = (ticket) => {
    console.log("Navigating to ticket:", ticket);

    // Get the ID from the appropriate location in the data structure
    const ticketId = ticket.id || ticket._id;

    // Make sure to use the correct route path - adjust this to match your router configuration
    // If your component is nested under /admin, use:
    navigate(`/admin/objection-tickets/${ticketId}`);

    // If it's at the root level, use:
    // navigate(`/objection-tickets/${ticketId}`);
  };

  // Helper to get status class
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "under-review":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-slate-600">
          {strings.tickets?.loading || "Loading tickets..."}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );

  // Determine text direction based on language
  const isRTL = currentLanguage === "ar";
  const directionClass = isRTL ? "rtl" : "ltr";

  return (
    <main className={`flex-1 overflow-y-auto h-full ${directionClass}`}>
      <div className="mx-auto max-w-4xl p-6 md:p-8 lg:p-10">
        {/* Language Switcher */}
        {/* <LanguageSwitcher /> */}

        <div className="mb-4">
          <span className="mb-2 inline-block rounded-full bg-apple-blueMedium px-3 py-1 text-xs font-medium text-apple-text">
            {strings.tickets?.dashboard || "Tickets Dashboard"}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {strings.tickets?.current || "Current Tickets"}
          </h1>
          <p className="mt-2 text-slate-600">
            {strings.tickets?.overview ||
              "Overview of reported issues and service-related tickets"}
          </p>
        </div>

        <div className="w-full">
          <form className="lg:block mb-[2rem]" onSubmit={handleSearch}>
            <div className="relative">
              <input
                className={`w-[99%] py-3 px-2 ${
                  isRTL ? "pr-10" : "pl-10"
                } rounded-full border text-sm text-black`}
                placeholder={
                  strings.search?.placeholder || "Search for a ticket"
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className={`absolute top-1.5 ${
                  isRTL ? "left-3" : "right-3"
                } flex items-center rounded-full bg-[rgba(91,184,255,1)] py-2.5 px-4 border border-transparent text-center text-sm text-white shadow-sm hover:shadow focus:bg-slate-700`}
                type="submit"
              >
                <Search
                  className={`${isRTL ? "ml-2" : "mr-2"} w-4 h-4 text-white`}
                />
                {strings.search?.button || "Search"}
              </button>
            </div>
          </form>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center p-8 text-slate-600">
            {strings.tickets?.noTicketsFound || "No tickets found"}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {tickets.map((ticket, index) => (
              <div
                key={ticket.id || ticket._id || index}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {ticket.issueTitle ||
                        ticket.ticketDetails?.issueTitle ||
                        "Unknown Issue"}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {new Date(
                        ticket.timestamp ||
                          ticket.timestamps?.submittedAt ||
                          new Date()
                      ).toLocaleDateString(currentLanguage)}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                        ticket.status || ticket.ticketDetails?.status
                      )}`}
                    >
                      {strings.status?.[
                        ticket.status || ticket.ticketDetails?.status
                      ] ||
                        ticket.status ||
                        ticket.ticketDetails?.status ||
                        "Unknown Status"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                    {ticket.issueDescription ||
                      ticket.issue?.description ||
                      "No description available"}
                  </p>
                  <div className="text-xs text-slate-500 mb-2">
                    <div>
                      {strings.tickets?.from || "From"}
                      {": "}
                      <span className="font-medium text-slate-700">
                        {ticket.sender?.name ||
                          ticket.ticketDetails?.sender?.name ||
                          "N/A"}
                      </span>
                    </div>
                    <div>
                      {strings.tickets?.to || "To"}
                      {": "}
                      <span className="font-medium text-slate-700">
                        {ticket.receiver?.name ||
                          ticket.ticketDetails?.receiver?.name ||
                          "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    {(ticket.service || ticket.ticketDetails?.service) && (
                      <div>
                        {strings.tickets?.service || "Service"}
                        {": "}
                        <span className="text-slate-700">
                          {(ticket.service && ticket.service.serviceName) ||
                            (ticket.ticketDetails?.service &&
                              ticket.ticketDetails.service.serviceName) ||
                            "N/A"}
                        </span>
                      </div>
                    )}
                    {(ticket.budget ||
                      ticket.ticketDetails?.service?.price) && (
                      <div>
                        {strings.tickets?.budget || "Budget"}
                        {": "}
                        <span className="text-slate-700">
                          $
                          {ticket.budget ||
                            ticket.ticketDetails?.service?.price}
                        </span>
                      </div>
                    )}
                  </div>
                  {(ticket.attachments?.length > 0 ||
                    ticket.issue?.attachments?.length > 0) && (
                    <div className="text-xs text-blue-600 underline mb-3">
                      {ticket.attachments?.length ||
                        ticket.issue?.attachments?.length}{" "}
                      {strings.tickets?.attachment || "Attachment"}
                      {ticket.attachments?.length > 1 ||
                      ticket.issue?.attachments?.length > 1
                        ? strings.tickets?.attachmentPlural || "s"
                        : ""}
                    </div>
                  )}
                  {(ticket.resolution || ticket.issue?.resolution) && (
                    <div className="bg-green-50 text-green-800 text-xs p-2 rounded-md mb-3">
                      <strong>
                        {strings.tickets?.resolution || "Resolution"}:
                      </strong>{" "}
                      {ticket.resolution || ticket.issue?.resolution}
                    </div>
                  )}
                  <div className="mt-4 flex justify-end space-x-3">
                    <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-apple-blue border border-apple-blue shadow-sm hover:bg-gray-50">
                      {strings.actions?.respond || "Respond"}
                    </button>
                    <button
                      onClick={() => navigateToDetails(ticket)}
                      className="inline-flex items-center justify-center rounded-md bg-apple-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-apple-blue/90"
                    >
                      {strings.actions?.viewDetails || "View Details"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ObjTicket;
