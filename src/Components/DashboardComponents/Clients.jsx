// import React, { useState, useEffect } from "react";
// import strings from "../../Languages/localization";
// import LanguageSwitcher from "./LanguageSwitcher";

// // Client Management Component
// function ClientManagement() {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [originalClients, setOriginalClients] = useState([]);
//   const [currentLanguage, setCurrentLanguage] = useState("en");
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [deleteReason, setDeleteReason] = useState("");
//   const [deleteNotes, setDeleteNotes] = useState("");
//   const [deleteStatus, setDeleteStatus] = useState({
//     loading: false,
//     error: null,
//     success: false,
//   });

//   // Add client management specific strings to the imported strings object
//   useEffect(() => {
//     if (!strings.clients) {
//       strings.clients = {
//         dashboard: "Client Dashboard",
//         management: "Client Management",
//         overview: "Manage and review client accounts and information",
//         loading: "Loading clients...",
//         noClientsFound: "No clients found",
//         fetchError: "Failed to fetch clients",
//         clientSince: "Client since",
//         phoneNumber: "Phone Number",
//         transactions: "Transactions",
//         transactionsCount: "total",
//         accountingFirm: "Accounting Firm",
//         deleteConfirmTitle: "Delete Client",
//         deleteConfirmMessage:
//           "Are you sure you want to delete this client? This action cannot be undone.",
//         deleteReason: "Reason for deletion",
//         selectReason: "Select a reason",
//         additionalNotes: "Additional notes",
//         deleteSuccess: "Client deleted successfully",
//         deleteError: "Failed to delete client",
//       };
//     }

//     if (!strings.reasons) {
//       strings.reasons = {
//         accountInactive: "Account Inactive",
//         violationOfTerms: "Violation of Terms",
//         userRequested: "User Requested",
//         fraudulentActivity: "Fraudulent Activity",
//         duplicateAccount: "Duplicate Account",
//         other: "Other",
//       };
//     }

//     // Add delete and cancel actions if they don't exist
//     if (!strings.actions.delete) {
//       strings.actions.delete = "Delete";
//     }

//     if (!strings.actions.cancel) {
//       strings.actions.cancel = "Cancel";
//     }

//     if (!strings.actions.deleting) {
//       strings.actions.deleting = "Deleting...";
//     }
//   }, []);

//   useEffect(() => {
//     fetchClients();

//     // Set initial language
//     const storedLanguage = localStorage.getItem("language") || "en";
//     setCurrentLanguage(storedLanguage);
//     strings.setLanguage(storedLanguage);

//     // Listen for language change events
//     const handleLanguageChange = () => {
//       const newLanguage = localStorage.getItem("language") || "en";
//       setCurrentLanguage(newLanguage);
//       strings.setLanguage(newLanguage);
//     };

//     window.addEventListener("languageChanged", handleLanguageChange);

//     // Cleanup listener on component unmount
//     return () => {
//       window.removeEventListener("languageChanged", handleLanguageChange);
//     };
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const response = await fetch("${process.env.REACT_APP_API_BASE_URL}/api/admin/clients", {
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const responseText = await response.text();

//       try {
//         const data = JSON.parse(responseText);
//         console.log("Parsed client data:", data);

//         if (data.success) {
//           setClients(data.data || []);
//           setOriginalClients(data.data || []);
//         } else {
//           setError(data.message || strings.clients?.fetchError);
//         }
//       } catch (parseError) {
//         console.error("JSON parse error:", parseError);
//         console.log("Raw response:", responseText);
//         setError(strings.clients?.fetchError);
//       }
//     } catch (err) {
//       console.error("Error fetching clients:", err);
//       setError(strings.clients?.fetchError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) {
//       // If search is empty, reset to original clients
//       setClients(originalClients);
//       return;
//     }

//     const searchQueryLower = searchQuery.toLowerCase();
//     const filtered = originalClients.filter(
//       (client) =>
//         (client.clientDetails?.name || "")
//           .toLowerCase()
//           .includes(searchQueryLower) ||
//         (client.clientDetails?.email || "")
//           .toLowerCase()
//           .includes(searchQueryLower) ||
//         (client.clientDetails?.phoneNumber || "")
//           .toLowerCase()
//           .includes(searchQueryLower)
//     );
//     setClients(filtered);
//   };

//   const navigateToDetails = (client) => {
//     const clientId = client.id || client._id;
//     window.location.href = `/admin/clients/${clientId}`;
//   };

//   const handleDeleteClick = (client) => {
//     setSelectedClient(client);
//     setDeleteModalOpen(true);
//     setDeleteReason("");
//     setDeleteNotes("");
//     setDeleteStatus({ loading: false, error: null, success: false });

//     // Log client object for debugging
//     console.log("Client to delete:", client);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!deleteReason) return;

//     setDeleteStatus({ loading: true, error: null, success: false });

//     try {
//       // Make sure we have a valid client ID
//       const clientId = selectedClient?.id || selectedClient?._id;

//       if (!clientId) {
//         setDeleteStatus({
//           loading: false,
//           error: "Invalid client ID",
//           success: false,
//         });
//         return;
//       }

//       console.log("Deleting client with ID:", clientId);
//       console.log("Delete payload:", {
//         reason: deleteReason,
//         additionalNotes: deleteNotes,
//       });

//       const response = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/api/admin/clients/${clientId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             reason: deleteReason,
//             additionalNotes: deleteNotes,
//           }),
//           credentials: "include",
//         }
//       );

//       // Log response status for debugging
//       console.log("Delete response status:", response.status);

//       const responseText = await response.text();
//       console.log("Delete response text:", responseText);

//       try {
//         const data = JSON.parse(responseText);
//         console.log("Delete response data:", data);

//         if (data.success) {
//           // Remove client from state
//           setClients(clients.filter((c) => (c.id || c._id) !== clientId));
//           setDeleteStatus({ loading: false, error: null, success: true });

//           // Close modal after a short delay to show success message
//           setTimeout(() => {
//             setDeleteModalOpen(false);
//           }, 1500);
//         } else {
//           // Show error message if API returns error
//           console.error("Error from API:", data.message, data.error);
//           setDeleteStatus({
//             loading: false,
//             error: `${data.message}: ${data.error || ""}`,
//             success: false,
//           });
//         }
//       } catch (parseError) {
//         console.error("JSON parse error:", parseError);
//         console.log("Raw response:", responseText);
//         setDeleteStatus({
//           loading: false,
//           error: strings.clients?.deleteError,
//           success: false,
//         });
//       }
//     } catch (err) {
//       console.error("Error deleting client:", err);
//       setDeleteStatus({
//         loading: false,
//         error: strings.clients?.deleteError,
//         success: false,
//       });
//     }
//   };

//   const validReasons = [
//     {
//       value: "account_inactive",
//       label: strings.reasons?.accountInactive || "Account Inactive",
//     },
//     {
//       value: "violation_of_terms",
//       label: strings.reasons?.violationOfTerms || "Violation of Terms",
//     },
//     {
//       value: "user_requested",
//       label: strings.reasons?.userRequested || "User Requested",
//     },
//     {
//       value: "fraudulent_activity",
//       label: strings.reasons?.fraudulentActivity || "Fraudulent Activity",
//     },
//     {
//       value: "duplicate_account",
//       label: strings.reasons?.duplicateAccount || "Duplicate Account",
//     },
//     { value: "other", label: strings.reasons?.other || "Other" },
//   ];

//   // Determine text direction based on language
//   const isRTL = currentLanguage === "ar";
//   const directionClass = isRTL ? "rtl" : "ltr";

//   if (loading)
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="flex items-center">
//           <div className="animate-spin text-slate-600 mr-2 h-5 w-5 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
//           <span className="text-slate-600">
//             {strings.clients?.loading || "Loading clients..."}
//           </span>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="flex items-center text-red-600">
//           <span>⚠️</span>
//           <span className="ml-2">{error}</span>
//         </div>
//       </div>
//     );

//   return (
//     <main className={`flex-1 overflow-y-auto h-full ${directionClass}`}>
//       <div className="mx-auto max-w-4xl p-6 md:p-8 lg:p-10">
//         {/* Language Switcher */}
//         <LanguageSwitcher />

//         <div className="mb-4">
//           <span className="mb-2 inline-block rounded-full bg-apple-blueMedium px-3 py-1 text-xs font-medium text-apple-text">
//             {strings.clients?.dashboard || "Client Dashboard"}
//           </span>
//           <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-3xl">
//             {strings.clients?.management || "Client Management"}
//           </h1>
//           <p className="mt-2 text-slate-600">
//             {strings.clients?.overview ||
//               "Manage and review client accounts and information"}
//           </p>
//         </div>

//         <div className="w-full">
//           <form className="lg:block mb-8" onSubmit={handleSearch}>
//             <div className="relative">
//               <input
//                 className={`w-full py-3 px-2 ${
//                   isRTL ? "pr-10" : "pl-10"
//                 } rounded-full border text-sm text-black`}
//                 placeholder={
//                   strings.search?.placeholder || "Search for a client"
//                 }
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button
//                 className={`absolute top-1.5 ${
//                   isRTL ? "left-3" : "right-3"
//                 } flex items-center rounded-full bg-apple-blue py-2.5 px-4 border border-transparent text-center text-sm text-white shadow-sm hover:bg-blue-600`}
//                 type="submit"
//               >
//                 <span className={`${isRTL ? "ml-2" : "mr-2"}`}>🔍</span>
//                 {strings.search?.button || "Search"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {clients.length === 0 ? (
//           <div className="text-center p-8 text-slate-600">
//             {strings.clients?.noClientsFound || "No clients found"}
//           </div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
//             {clients.map((client, index) => (
//               <ClientCard
//                 key={client.id || client._id || index}
//                 client={client}
//                 onViewDetails={() => navigateToDetails(client)}
//                 onDelete={() => handleDeleteClick(client)}
//                 strings={strings}
//                 isRTL={isRTL}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {deleteModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">
//               {strings.clients?.deleteConfirmTitle || "Delete Client"}
//             </h2>

//             {selectedClient && (
//               <div className="mb-4 bg-gray-100 p-3 rounded">
//                 <p className="font-medium">
//                   {selectedClient.clientDetails?.name || "Unnamed Client"}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {selectedClient.clientDetails?.email || "No email"}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   ID: {selectedClient.id || selectedClient._id || "Unknown"}
//                 </p>
//               </div>
//             )}

//             <p className="mb-4">
//               {strings.clients?.deleteConfirmMessage ||
//                 "Are you sure you want to delete this client? This action cannot be undone."}
//             </p>

//             {deleteStatus.success && (
//               <div className="mb-4 bg-green-100 text-green-700 p-3 rounded flex items-center">
//                 <span className="mr-2">✅</span>
//                 <span>
//                   {strings.clients?.deleteSuccess ||
//                     "Client deleted successfully"}
//                 </span>
//               </div>
//             )}

//             {deleteStatus.error && (
//               <div className="mb-4 bg-red-100 text-red-700 p-3 rounded flex items-center">
//                 <span className="mr-2">⚠️</span>
//                 <span>{deleteStatus.error}</span>
//               </div>
//             )}

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">
//                 {strings.clients?.deleteReason || "Reason for deletion"}
//               </label>
//               <select
//                 value={deleteReason}
//                 onChange={(e) => setDeleteReason(e.target.value)}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={deleteStatus.loading || deleteStatus.success}
//               >
//                 <option value="">
//                   {strings.clients?.selectReason || "Select a reason"}
//                 </option>
//                 {validReasons.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">
//                 {strings.clients?.additionalNotes || "Additional notes"}
//               </label>
//               <textarea
//                 value={deleteNotes}
//                 onChange={(e) => setDeleteNotes(e.target.value)}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows="3"
//                 disabled={deleteStatus.loading || deleteStatus.success}
//               ></textarea>
//             </div>

//             <div
//               className={`flex justify-end ${
//                 isRTL ? "space-x-reverse" : ""
//               } space-x-2`}
//             >
//               {!deleteStatus.success && (
//                 <>
//                   <button
//                     onClick={() => setDeleteModalOpen(false)}
//                     className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                     disabled={deleteStatus.loading}
//                   >
//                     {strings.actions?.cancel || "Cancel"}
//                   </button>
//                   <button
//                     onClick={handleDeleteConfirm}
//                     disabled={
//                       !deleteReason ||
//                       deleteStatus.loading ||
//                       deleteStatus.success
//                     }
//                     className={`px-4 py-2 rounded text-white ${
//                       !deleteReason || deleteStatus.loading
//                         ? "bg-red-300 cursor-not-allowed"
//                         : "bg-red-600 hover:bg-red-700"
//                     }`}
//                   >
//                     {deleteStatus.loading
//                       ? strings.actions?.deleting || "Deleting..."
//                       : strings.actions?.delete || "Delete"}
//                   </button>
//                 </>
//               )}

//               {deleteStatus.success && (
//                 <button
//                   onClick={() => setDeleteModalOpen(false)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   {strings.actions?.close || "Close"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

// // Client Card Component
// const ClientCard = ({ client, onViewDetails, onDelete, strings, isRTL }) => {
//   const [expanded, setExpanded] = useState(false);

//   // Safely access properties with fallbacks
//   const clientName = client?.clientDetails?.name || "Unnamed Client";
//   const clientEmail = client?.clientDetails?.email || "No email provided";
//   const clientPhone = client?.clientDetails?.phoneNumber || "No phone provided";
//   const transactionsCount = client?.transactions?.length || 0;
//   const createdDate = client?.timestamps?.created
//     ? new Date(client.timestamps.created).toLocaleDateString()
//     : "Unknown date";

//   const toggleExpand = () => setExpanded(!expanded);

//   return (
//     <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
//       <div className="bg-apple-blue p-4 flex justify-between items-center">
//         <h3 className="text-white font-medium truncate">{clientName}</h3>
//         <div className="bg-white rounded-full p-1.5 flex-shrink-0">
//           <span className="text-apple-blue">👤</span>
//         </div>
//       </div>

//       <div className="p-4 border-b cursor-pointer" onClick={toggleExpand}>
//         <div className="flex justify-between items-center">
//           <div className="overflow-hidden">
//             <p className="text-sm font-medium text-slate-900 truncate">
//               {clientEmail}
//             </p>
//             <p className="text-xs text-slate-500">
//               {strings.clients?.clientSince || "Client since"}: {createdDate}
//             </p>
//           </div>
//           <button className="text-apple-blue flex-shrink-0">
//             {expanded ? "▲" : "▼"}
//           </button>
//         </div>
//       </div>

//       {/* Expanded content */}
//       {expanded && (
//         <div className="p-4 bg-gray-50">
//           <div className="space-y-3">
//             <div>
//               <p className="text-xs text-slate-500">
//                 {strings.clients?.phoneNumber || "Phone Number"}
//               </p>
//               <p className="text-sm text-slate-700">{clientPhone}</p>
//             </div>

//             <div>
//               <p className="text-xs text-slate-500">
//                 {strings.clients?.transactions || "Transactions"}
//               </p>
//               <p className="text-sm text-slate-700">
//                 {transactionsCount}{" "}
//                 {strings.clients?.transactionsCount || "total"}
//               </p>
//             </div>

//             {client.accountingFirm && (
//               <div>
//                 <p className="text-xs text-slate-500">
//                   {strings.clients?.accountingFirm || "Accounting Firm"}
//                 </p>
//                 <p className="text-sm text-slate-700">
//                   {client.accountingFirm.firmName || "Not assigned"}
//                 </p>
//               </div>
//             )}

//             <div>
//               <p className="text-xs text-slate-500">Client ID</p>
//               <p className="text-sm text-slate-700">
//                 {client.id || client._id || "Unknown"}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div
//         className={`p-4 flex justify-end ${
//           isRTL ? "space-x-reverse" : ""
//         } space-x-3`}
//       >
//         <button
//           onClick={onDelete}
//           className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-red-600 border border-red-600 shadow-sm hover:bg-red-50"
//         >
//           {strings.actions?.delete || "Delete"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClientManagement;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import strings from "../../Languages/localization";
import LanguageSwitcher from "./LanguageSwitcher";
import { Search } from "lucide-react";

// Client Management Component
function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalClients, setOriginalClients] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteNotes, setDeleteNotes] = useState("");
  const [deleteStatus, setDeleteStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  // Add client management specific strings to the imported strings object
  useEffect(() => {
    if (!strings.clients) {
      strings.clients = {
        dashboard: "Client Dashboard",
        management: "Client Management",
        overview: "Manage and review client accounts and information",
        loading: "Loading clients...",
        noClientsFound: "No clients found",
        fetchError: "Failed to fetch clients",
        clientSince: "Client since",
        phoneNumber: "Phone Number",
        transactions: "Transactions",
        transactionsCount: "total",
        accountingFirm: "Accounting Firm",
        deleteConfirmTitle: "Delete Client",
        deleteConfirmMessage:
          "Are you sure you want to delete this client? This action cannot be undone.",
        deleteReason: "Reason for deletion",
        selectReason: "Select a reason",
        additionalNotes: "Additional notes",
        deleteSuccess: "Client deleted successfully",
        deleteError: "Failed to delete client",
      };
    }

    if (!strings.reasons) {
      strings.reasons = {
        accountInactive: "Account Inactive",
        violationOfTerms: "Violation of Terms",
        userRequested: "User Requested",
        fraudulentActivity: "Fraudulent Activity",
        duplicateAccount: "Duplicate Account",
        other: "Other",
      };
    }

    // Add delete and cancel actions if they don't exist
    if (!strings.actions.delete) {
      strings.actions.delete = "Delete";
    }

    if (!strings.actions.cancel) {
      strings.actions.cancel = "Cancel";
    }

    if (!strings.actions.deleting) {
      strings.actions.deleting = "Deleting...";
    }

    if (!strings.actions.close) {
      strings.actions.close = "Close";
    }
  }, []);

  useEffect(() => {
    fetchClients();

    // Set initial language
    const storedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(storedLanguage);
    strings.setLanguage(storedLanguage);

    // Listen for language change events
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("language") || "en";
      setCurrentLanguage(newLanguage);
      strings.setLanguage(newLanguage);
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/admin/clients`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);
        console.log("Parsed client data:", data);

        if (data.success) {
          setClients(data.data || []);
          setOriginalClients(data.data || []);
        } else {
          setError(data.message || strings.clients?.fetchError);
        }
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.log("Raw response:", responseText);
        setError(strings.clients?.fetchError);
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError(strings.clients?.fetchError);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      // If search is empty, reset to original clients
      setClients(originalClients);
      return;
    }

    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = originalClients.filter(
      (client) =>
        (client.clientDetails?.name || "")
          .toLowerCase()
          .includes(searchQueryLower) ||
        (client.clientDetails?.email || "")
          .toLowerCase()
          .includes(searchQueryLower) ||
        (client.clientDetails?.phoneNumber || "")
          .toLowerCase()
          .includes(searchQueryLower)
    );
    setClients(filtered);
  };

  const navigateToDetails = (client) => {
    const clientId = client.id || client._id;
    window.location.href = `/admin/clients/${clientId}`;
  };

  const handleDeleteClick = (client) => {
    setSelectedClient(client);
    setDeleteModalOpen(true);
    setDeleteReason("");
    setDeleteNotes("");
    setDeleteStatus({ loading: false, error: null, success: false });

    // Log client object for debugging
    console.log("Client to delete:", client);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteReason) return;

    setDeleteStatus({ loading: true, error: null, success: false });

    try {
      // Make sure we have a valid client ID
      const clientId = selectedClient?.id || selectedClient?._id;

      if (!clientId) {
        setDeleteStatus({
          loading: false,
          error: "Invalid client ID",
          success: false,
        });
        return;
      }

      console.log("Deleting client with ID:", clientId);
      console.log("Delete payload:", {
        reason: deleteReason,
        additionalNotes: deleteNotes,
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/admin/clients/${clientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: deleteReason,
            additionalNotes: deleteNotes,
          }),
          credentials: "include",
        }
      );

      // Log response status for debugging
      console.log("Delete response status:", response.status);

      const responseText = await response.text();
      console.log("Delete response text:", responseText);

      try {
        const data = JSON.parse(responseText);
        console.log("Delete response data:", data);

        if (data.success) {
          // Remove client from state
          setClients(clients.filter((c) => (c.id || c._id) !== clientId));
          setDeleteStatus({ loading: false, error: null, success: true });

          // Close modal after a short delay to show success message
          setTimeout(() => {
            setDeleteModalOpen(false);
          }, 1500);
        } else {
          // Show error message if API returns error
          console.error("Error from API:", data.message, data.error);
          setDeleteStatus({
            loading: false,
            error: `${data.message}: ${data.error || ""}`,
            success: false,
          });
        }
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.log("Raw response:", responseText);
        setDeleteStatus({
          loading: false,
          error: strings.clients?.deleteError,
          success: false,
        });
      }
    } catch (err) {
      console.error("Error deleting client:", err);
      setDeleteStatus({
        loading: false,
        error: strings.clients?.deleteError,
        success: false,
      });
    }
  };

  const validReasons = [
    {
      value: "account_inactive",
      label: strings.reasons?.accountInactive || "Account Inactive",
    },
    {
      value: "violation_of_terms",
      label: strings.reasons?.violationOfTerms || "Violation of Terms",
    },
    {
      value: "user_requested",
      label: strings.reasons?.userRequested || "User Requested",
    },
    {
      value: "fraudulent_activity",
      label: strings.reasons?.fraudulentActivity || "Fraudulent Activity",
    },
    {
      value: "duplicate_account",
      label: strings.reasons?.duplicateAccount || "Duplicate Account",
    },
    { value: "other", label: strings.reasons?.other || "Other" },
  ];

  // Determine text direction based on language
  const isRTL = currentLanguage === "ar";
  const directionClass = isRTL ? "rtl" : "ltr";

  // Fade in animation for page content
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  // Stagger animation for client cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="mr-2 h-5 w-5 border-t-2 border-b-2 border-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          ></motion.div>
          <span className="text-slate-600">
            {strings.clients?.loading || "Loading clients..."}
          </span>
        </motion.div>
      </div>
    );

  if (error)
    return (
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center text-red-600">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            ⚠️
          </motion.span>
          <motion.span
            className="ml-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {error}
          </motion.span>
        </div>
      </motion.div>
    );

  return (
    <motion.main
      className={`flex-1 overflow-y-auto h-full ${directionClass}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="mx-auto max-w-4xl p-6 md:p-8 lg:p-10">
        {/* Language Switcher */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* <LanguageSwitcher /> */}
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="mb-2 inline-block rounded-full bg-apple-blueMedium px-3 py-1 text-xs font-medium text-apple-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {strings.clients?.dashboard || "Client Dashboard"}
          </motion.span>
          <motion.h1
            className="text-3xl font-bold tracking-tight text-slate-900 md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {strings.clients?.management || "Client Management"}
          </motion.h1>
          <motion.p
            className="mt-2 text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {strings.clients?.overview ||
              "Manage and review client accounts and information"}
          </motion.p>
        </motion.div>

        <div className="w-full">
          <form className="lg:block mb-8" onSubmit={handleSearch}>
            <motion.div
              className="relative"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <input
                className={`w-full py-3 px-2 ${
                  isRTL ? "pr-10" : "pl-10"
                } rounded-full border text-sm text-black`}
                placeholder={
                  strings.search?.placeholder || "Search for a client"
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <motion.button
                className={`absolute top-1.5 ${
                  isRTL ? "left-3" : "right-3"
                } flex items-center rounded-full bg-apple-blue py-2.5 px-4 border border-transparent text-center text-sm text-white shadow-sm hover:bg-blue-600`}
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.span
                  className={`${isRTL ? "ml-2" : "mr-2"}`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Search
                    className={`${isRTL ? "ml-2" : "mr-2"} w-4 h-4 text-white`}
                  />
                </motion.span>
                {strings.search?.button || "Search"}
              </motion.button>
            </motion.div>
          </form>
        </div>

        <AnimatePresence mode="wait">
          {clients.length === 0 ? (
            <motion.div
              key="no-clients"
              className="text-center p-8 text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {strings.clients?.noClientsFound || "No clients found"}
            </motion.div>
          ) : (
            <motion.div
              key="client-grid"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {clients.map((client, index) => (
                <ClientCard
                  key={client.id || client._id || index}
                  client={client}
                  onViewDetails={() => navigateToDetails(client)}
                  onDelete={() => handleDeleteClick(client)}
                  strings={strings}
                  isRTL={isRTL}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal with Animation */}
      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.h2
                className="text-xl font-bold mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {strings.clients?.deleteConfirmTitle || "Delete Client"}
              </motion.h2>

              {selectedClient && (
                <motion.div
                  className="mb-4 bg-gray-100 p-3 rounded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-medium">
                    {selectedClient.clientDetails?.name || "Unnamed Client"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedClient.clientDetails?.email || "No email"}
                  </p>
                  <p className="text-sm text-gray-600">
                    ID: {selectedClient.id || selectedClient._id || "Unknown"}
                  </p>
                </motion.div>
              )}

              <motion.p
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {strings.clients?.deleteConfirmMessage ||
                  "Are you sure you want to delete this client? This action cannot be undone."}
              </motion.p>

              <AnimatePresence>
                {deleteStatus.success && (
                  <motion.div
                    className="mb-4 bg-green-100 text-green-700 p-3 rounded flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span
                      className="mr-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      ✅
                    </motion.span>
                    <span>
                      {strings.clients?.deleteSuccess ||
                        "Client deleted successfully"}
                    </span>
                  </motion.div>
                )}

                {deleteStatus.error && (
                  <motion.div
                    className="mb-4 bg-red-100 text-red-700 p-3 rounded flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span
                      className="mr-2"
                      animate={{
                        rotate: [0, 10, -10, 10, -10, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      ⚠️
                    </motion.span>
                    <span>{deleteStatus.error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-700 mb-2">
                  {strings.clients?.deleteReason || "Reason for deletion"}
                </label>
                <motion.select
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={deleteStatus.loading || deleteStatus.success}
                  whileFocus={{
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <option value="">
                    {strings.clients?.selectReason || "Select a reason"}
                  </option>
                  {validReasons.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </motion.select>
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-gray-700 mb-2">
                  {strings.clients?.additionalNotes || "Additional notes"}
                </label>
                <motion.textarea
                  value={deleteNotes}
                  onChange={(e) => setDeleteNotes(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  disabled={deleteStatus.loading || deleteStatus.success}
                  whileFocus={{
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                  }}
                ></motion.textarea>
              </motion.div>

              <motion.div
                className={`flex justify-end ${
                  isRTL ? "space-x-reverse" : ""
                } space-x-2`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {!deleteStatus.success && (
                  <>
                    <motion.button
                      onClick={() => setDeleteModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={deleteStatus.loading}
                      whileHover={{ backgroundColor: "#d1d5db" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {strings.actions?.cancel || "Cancel"}
                    </motion.button>
                    <motion.button
                      onClick={handleDeleteConfirm}
                      disabled={
                        !deleteReason ||
                        deleteStatus.loading ||
                        deleteStatus.success
                      }
                      className={`px-4 py-2 rounded text-white ${
                        !deleteReason || deleteStatus.loading
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      whileHover={
                        !deleteReason || deleteStatus.loading
                          ? {}
                          : { backgroundColor: "#b91c1c" }
                      }
                      whileTap={
                        !deleteReason || deleteStatus.loading
                          ? {}
                          : { scale: 0.95 }
                      }
                    >
                      {deleteStatus.loading ? (
                        <span className="flex items-center">
                          <motion.span
                            className="inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          ></motion.span>
                          {strings.actions?.deleting || "Deleting..."}
                        </span>
                      ) : (
                        strings.actions?.delete || "Delete"
                      )}
                    </motion.button>
                  </>
                )}

                {deleteStatus.success && (
                  <motion.button
                    onClick={() => setDeleteModalOpen(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    whileHover={{ backgroundColor: "#2563eb" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {strings.actions?.close || "Close"}
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

// Client Card Component
const ClientCard = ({
  client,
  onViewDetails,
  onDelete,
  strings,
  isRTL,
  index,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Safely access properties with fallbacks
  const clientName = client?.clientDetails?.name || "Unnamed Client";
  const clientEmail = client?.clientDetails?.email || "No email provided";
  const clientPhone = client?.clientDetails?.phoneNumber || "No phone provided";
  const transactionsCount = client?.transactions?.length || 0;
  const createdDate = client?.timestamps?.created
    ? new Date(client.timestamps.created).toLocaleDateString()
    : "Unknown date";

  const toggleExpand = () => setExpanded(!expanded);

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.1, // stagger based on index
      },
    },
  };

  return (
    <motion.div
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="bg-apple-blue p-4 flex justify-between items-center"
        whileHover={{ backgroundColor: "#0056b3" }}
      >
        <motion.h3
          className="text-white font-medium truncate"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {clientName}
        </motion.h3>
        <motion.div
          className="bg-white rounded-full p-1.5 flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-apple-blue">👤</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="p-4 border-b cursor-pointer"
        onClick={toggleExpand}
        whileHover={{ backgroundColor: "#f9fafb" }}
      >
        <div className="flex justify-between items-center">
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-900 truncate">
              {clientEmail}
            </p>
            <p className="text-xs text-slate-500">
              {strings.clients?.clientSince || "Client since"}: {createdDate}
            </p>
          </div>
          <motion.button
            className="text-apple-blue flex-shrink-0"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.button>
        </div>
      </motion.div>

      {/* Expanded content with animation */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="p-4 bg-gray-50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-xs text-slate-500">
                  {strings.clients?.phoneNumber || "Phone Number"}
                </p>
                <p className="text-sm text-slate-700">{clientPhone}</p>
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs text-slate-500">
                  {strings.clients?.transactions || "Transactions"}
                </p>
                <p className="text-sm text-slate-700">
                  {transactionsCount}{" "}
                  {strings.clients?.transactionsCount || "total"}
                </p>
              </motion.div>

              {client.accountingFirm && (
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-slate-500">
                    {strings.clients?.accountingFirm || "Accounting Firm"}
                  </p>
                  <p className="text-sm text-slate-700">
                    {client.accountingFirm.firmName || "Not assigned"}
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-xs text-slate-500">Client ID</p>
                <p className="text-sm text-slate-700">
                  {client.id || client._id || "Unknown"}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`p-4 flex justify-end ${
          isRTL ? "space-x-reverse" : ""
        } space-x-3`}
      >
        <motion.button
          onClick={onDelete}
          className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-red-600 border border-red-600 shadow-sm hover:bg-red-50"
          whileHover={{ scale: 1.05, backgroundColor: "#fee2e2" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {strings.actions?.delete || "Delete"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ClientManagement;
