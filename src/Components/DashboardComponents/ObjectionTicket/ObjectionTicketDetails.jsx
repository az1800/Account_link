import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import strings from "../../../Languages/localization";
import LanguageSwitcher from "../LanguageSwitcher";
import {
  ArrowLeft,
  FileText,
  Check,
  Clock,
  AlertTriangle,
  User,
  ChevronDown,
} from "lucide-react";

// Configure axios with base URL
axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}`;

function ObjectionTicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState(null);

  // Reference to the dropdown for outside click handling
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchTicketDetails();

    // Set initial language
    const storedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(storedLanguage);
    strings.setLanguage(storedLanguage);

    // Listen for language change events
    const handleLanguageChange = () => {
      setCurrentLanguage(localStorage.getItem("language") || "en");
    };

    // Listen for clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStatusDropdownOpen(false);
      }
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      console.log("Fetching ticket with ID:", id); // Debug log

      const response = await axios.get(`/api/admin/objection-tickets/${id}`, {
        withCredentials: true, // Fixed: was "Credentials: true"
      });

      console.log("Response:", response.data); // Debug log
      setTicket(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching ticket details:", err);

      // Fallback to getting all tickets
      try {
        const allTicketsResponse = await axios.get(
          "/api/admin/objection-tickets",
          {
            withCredentials: true,
          }
        );

        const tickets = allTicketsResponse.data.data || [];
        const foundTicket = tickets.find(
          (ticket) => ticket.id === id || ticket._id === id
        );

        if (foundTicket) {
          setTicket(foundTicket);
        } else {
          setError(strings.tickets?.notFound || "Ticket not found");
        }
      } catch (fallbackErr) {
        setError(
          strings.tickets?.fetchDetailError || "Failed to fetch ticket details"
        );
      }
      setLoading(false);
    }
  };
  // Handler for updating ticket status
  const updateTicketStatus = async (event) => {
    const newStatus = event.target.value;
    if (newStatus === ticketData.status) return;

    try {
      setUpdatingStatus(true);
      setStatusUpdateError(null);
      setStatusUpdateSuccess(false);

      const response = await axios.patch(
        `/api/admin/objection-tickets/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      // Update the local ticket data with new status
      setTicket((prevTicket) => {
        if (prevTicket.ticketDetails) {
          return {
            ...prevTicket,
            ticketDetails: {
              ...prevTicket.ticketDetails,
              status: newStatus,
            },
          };
        } else {
          return {
            ...prevTicket,
            status: newStatus,
          };
        }
      });

      setStatusUpdateSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      setStatusUpdateError(
        strings.tickets?.updateStatusError || "Failed to update ticket status"
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Helper to get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          color: "text-orange-500",
          bgColor: "bg-orange-100",
          label: strings.status?.pending || "Pending",
        };
      case "under-review":
        return {
          icon: <Clock className="w-5 h-5" />,
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          label: strings.status?.["under-review"] || "Under Review",
        };
      case "resolved":
        return {
          icon: <Check className="w-5 h-5" />,
          color: "text-green-500",
          bgColor: "bg-green-100",
          label: strings.status?.resolved || "Resolved",
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          label: status,
        };
    }
  };

  // Handler for back navigation
  const handleBackNavigation = () => {
    // Adjust the path based on your application's route structure
    navigate("/AdminPage");
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="text-slate-600">
          {strings.tickets?.loading || "Loading ticket details..."}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-screen">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={handleBackNavigation}
          className="flex items-center text-apple-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {strings.actions?.backToTickets || "Back to tickets"}
        </button>
      </div>
    );
  }

  // Determine text direction based on language
  const isRTL = currentLanguage === "ar";
  const directionClass = isRTL ? "rtl" : "ltr";

  if (!ticket) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-screen">
        <div className="text-slate-600 mb-4">
          {strings.tickets?.notFound || "Ticket not found"}
        </div>
        <button
          onClick={handleBackNavigation}
          className="flex items-center text-apple-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {strings.actions?.backToTickets || "Back to tickets"}
        </button>
      </div>
    );
  }

  // Extract the status info
  const statusInfo = getStatusInfo(
    ticket.status || ticket.ticketDetails?.status
  );

  // Determine structure based on API response shape
  const ticketData = {
    id: ticket._id || ticket.id,
    title: ticket.issueTitle || ticket.ticketDetails?.issueTitle,
    customTitle: ticket.customIssueTitle,
    status: ticket.status || ticket.ticketDetails?.status,
    timestamp: ticket.timestamp || ticket.timestamps?.submittedAt || new Date(),
    description: ticket.issueDescription || ticket.issue?.description,
    originalDescription: ticket.originalDescription,
    resolution: ticket.resolution || ticket.issue?.resolution,
    attachments: ticket.attachments || ticket.issue?.attachments || [],
    client: ticket.clientID || ticket.client,
    sender: ticket.sender || ticket.ticketDetails?.sender,
    receiver: ticket.receiver || ticket.ticketDetails?.receiver,
    service: ticket.service || ticket.ticketDetails?.service,
    budget: ticket.budget || ticket.ticketDetails?.service?.price,
  };

  return (
    <main className={`flex-1 overflow-y-auto h-full ${directionClass}`}>
      <div className="mx-auto max-w-4xl p-6 md:p-8 lg:p-10">
        {/* Language Switcher */}
        {/* <LanguageSwitcher /> */}

        {/* Back button */}
        <button
          onClick={handleBackNavigation}
          className={`flex items-center text-apple-blue hover:underline mb-6 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"}`} />
          {strings.actions?.backToTickets || "Back to tickets"}
        </button>

        {/* Ticket title and metadata */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 p-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {ticketData.title}
                  {ticketData.customTitle && `: ${ticketData.customTitle}`}
                </h1>
                <div className="mt-2 flex items-center">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${statusInfo.bgColor} ${statusInfo.color}`}
                  >
                    {statusInfo.icon}
                    <span className="ml-1">{statusInfo.label}</span>
                  </span>
                  <span className="mx-2 text-slate-400">•</span>
                  <span className="text-sm text-slate-500">
                    {strings.tickets?.ticketId || "Ticket ID"}: #
                    {String(ticketData.id)?.substring(0, 8) || "Unknown"}
                  </span>
                </div>
              </div>
              <div className="text-sm text-slate-500">
                {strings.tickets?.submitted || "Submitted"}:{" "}
                {new Date(ticketData.timestamp).toLocaleDateString(
                  currentLanguage,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
            </div>
          </div>

          {/* Status update success message */}
          {statusUpdateSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 mx-6 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    {strings.tickets?.statusUpdateSuccess ||
                      "Ticket status updated successfully!"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status update error message */}
          {statusUpdateError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 mx-6 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{statusUpdateError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Ticket details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              {/* Issue description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2 text-slate-900">
                  {strings.tickets?.issueDescription || "Issue Description"}
                </h2>
                <div className="p-4 bg-gray-50 rounded-lg text-slate-700">
                  {ticketData.description || (
                    <span className="text-slate-400 italic">
                      {strings.tickets?.noDescription ||
                        "No description provided"}
                    </span>
                  )}
                </div>
              </div>

              {/* Original service description */}
              {ticketData.originalDescription && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2 text-slate-900">
                    {strings.tickets?.originalRequest ||
                      "Original Request Description"}
                  </h2>
                  <div className="p-4 bg-gray-50 rounded-lg text-slate-700">
                    {ticketData.originalDescription}
                  </div>
                </div>
              )}

              {/* Resolution */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2 text-slate-900">
                  {strings.tickets?.resolution || "Resolution"}
                </h2>
                <div className="p-4 bg-gray-50 rounded-lg text-slate-700">
                  {ticketData.resolution ? (
                    ticketData.resolution
                  ) : (
                    <span className="text-slate-400 italic">
                      {strings.tickets?.noResolution || "No resolution yet"}
                    </span>
                  )}
                </div>
              </div>

              {/* Attachments */}
              {ticketData.attachments && ticketData.attachments.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2 text-slate-900">
                    {strings.tickets?.attachments || "Attachments"}
                  </h2>
                  <ul className="space-y-2">
                    {ticketData.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a
                          href={attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 border rounded-md hover:bg-gray-50 text-apple-blue"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          {typeof attachment === "string"
                            ? attachment.split("/").pop()
                            : `Attachment ${index + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar with metadata */}
            <div className="col-span-1">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-slate-900">
                  {strings.tickets?.details || "Ticket Details"}
                </h2>

                {/* Client */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">
                    {strings.tickets?.client || "Client"}
                  </h3>
                  <div className="flex items-center text-slate-900">
                    <User className="w-4 h-4 mr-1 text-slate-400" />
                    <span>{ticketData.client?.name || "N/A"}</span>
                  </div>
                </div>

                {/* From/To (Sender/Receiver) */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">
                    {strings.tickets?.from || "From"}
                  </h3>
                  <div className="text-slate-900">
                    {ticketData.sender?.name || "N/A"}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">
                    {strings.tickets?.to || "To"}
                  </h3>
                  <div className="text-slate-900">
                    {ticketData.receiver?.name || "N/A"}
                  </div>
                </div>

                {/* Service */}
                {ticketData.service && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">
                      {strings.tickets?.service || "Service"}
                    </h3>
                    <div className="text-slate-900">
                      {ticketData.service.serviceName || "N/A"}
                    </div>
                  </div>
                )}

                {/* Budget */}
                {ticketData.budget && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">
                      {strings.tickets?.budget || "Budget"}
                    </h3>
                    <div className="text-slate-900">${ticketData.budget}</div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 space-y-2">
                {/* Status update with enhanced styling */}
                <div className="relative">
                  <div className="relative">
                    <select
                      value={ticketData.status}
                      onChange={updateTicketStatus}
                      disabled={updatingStatus}
                      className="w-full rounded-md py-2.5 px-4 font-medium shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 bg-blue-500 text-white"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1em 1em",
                        paddingRight: "3rem",
                      }}
                    >
                      <option value="" disabled>
                        {updatingStatus ? "Updating..." : "Update Status"}
                      </option>
                      <option value="pending">Pending</option>
                      <option value="under-review">Under Review</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                      {updatingStatus && (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Respond Button with enhanced styling */}
                <button
                  className="w-full bg-white text-blue-500 border border-blue-500 rounded-md py-2.5 px-4 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-sm"
                  type="button"
                >
                  {strings.actions?.respond || "Respond"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ObjectionTicketDetails;
