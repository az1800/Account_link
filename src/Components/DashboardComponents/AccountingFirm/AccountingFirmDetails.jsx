// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "./Sidebar";
// import {
//   FiPrinter,
//   FiFileText,
//   FiDollarSign,
//   FiBriefcase,
//   FiBox,
//   FiHeadphones,
//   FiFile,
//   FiLogOut,
// } from "react-icons/fi";
// import {
//   Star,
//   Users,
//   MapPin,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
// } from "lucide-react";

// const menuItems = [
//   { title: "تذاكر اعتراض", icon: <FiFileText /> },
//   { title: "طلبات تحديث البيانات", icon: <FiPrinter /> },
//   { title: "مكاتب المحاسبة", icon: <FiDollarSign /> },
//   { title: "قائمة العملاء", icon: <FiBriefcase /> },
//   { title: "الباقات المحاسبية", icon: <FiBox /> },
//   { title: "الدعم الفني", icon: <FiHeadphones /> },
//   { title: "إدارة الملفات", icon: <FiFile /> },
//   { title: "تسجيل الخروج", icon: <FiLogOut /> },
// ];

// const AccountingFirmDetails = () => {
//   const [selected, setSelected] = useState("مكاتب المحاسبة");
//   const [firmDetails, setFirmDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchFirmDetails = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/api/admin/accounting-firms/${id}`
//         );
//         setFirmDetails(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching firm details:", error);
//         setLoading(false);
//       }
//     };

//     fetchFirmDetails();
//   }, [id]);

//   // Rating stars rendering function
//   const renderRatingStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(
//           <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//         );
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
//       } else {
//         stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
//       }
//     }

//     return stars;
//   };

//   // Status badge styles
//   const getStatusBadgeStyles = (status) => {
//     switch (status) {
//       case "verified":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "verified":
//         return <CheckCircle className="w-4 h-4 mr-1 text-green-600" />;
//       case "pending":
//         return <Clock className="w-4 h-4 mr-1 text-yellow-600" />;
//       case "rejected":
//         return <XCircle className="w-4 h-4 mr-1 text-red-600" />;
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen w-full overflow-hidden bg-slate-50">
//         <Sidebar
//           menuItems={menuItems}
//           selected={selected}
//           setSelected={setSelected}
//         />
//         <div className="flex-1 p-4 flex justify-center items-center">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen w-full overflow-hidden bg-slate-50">
//       <Sidebar
//         menuItems={menuItems}
//         selected={selected}
//         setSelected={setSelected}
//       />
//       <div className="flex-1 p-4 overflow-y-auto">
//         <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//           {/* Firm Header */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">
//                 {firmDetails.firmName}
//               </h1>
//               <span
//                 className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyles(
//                   firmDetails.status
//                 )}`}
//               >
//                 {getStatusIcon(firmDetails.status)}
//                 {firmDetails.status}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <div className="flex mr-2">
//                 {renderRatingStars(firmDetails.rating)}
//               </div>
//               <span className="text-sm text-slate-500">
//                 ({firmDetails.rating})
//               </span>
//             </div>
//           </div>

//           {/* Firm Details Grid */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div>
//               <div className="bg-slate-50 p-4 rounded-lg mb-4">
//                 <h2 className="text-lg font-semibold mb-3 text-slate-800">
//                   المعلومات الأساسية
//                 </h2>
//                 <div className="space-y-2">
//                   <div className="flex items-center">
//                     <Users className="w-4 h-4 mr-2 text-slate-500" />
//                     <span className="text-sm">
//                       حجم المكتب: {firmDetails.firmSize} موظف
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <MapPin className="w-4 h-4 mr-2 text-slate-500" />
//                     <span className="text-sm">{firmDetails.address}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <FileText className="w-4 h-4 mr-2 text-slate-500" />
//                     <span className="text-sm">
//                       السجل التجاري: {firmDetails.commercialRegister}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Specialization */}
//               <div className="bg-slate-50 p-4 rounded-lg">
//                 <h2 className="text-lg font-semibold mb-3 text-slate-800">
//                   التخصص
//                 </h2>
//                 <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
//                   {firmDetails.industrySpecialization}
//                 </span>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div>
//               {/* Description */}
//               <div className="bg-slate-50 p-4 rounded-lg mb-4">
//                 <h2 className="text-lg font-semibold mb-3 text-slate-800">
//                   الوصف
//                 </h2>
//                 <p className="text-sm text-slate-600">
//                   {firmDetails.description}
//                 </p>
//               </div>

//               {/* Certification */}
//               <div className="bg-slate-50 p-4 rounded-lg">
//                 <h2 className="text-lg font-semibold mb-3 text-slate-800">
//                   التراخيص والشهادات
//                 </h2>
//                 <p className="text-sm text-slate-600">
//                   {firmDetails.certificationDetails || "لا توجد شهادات مسجلة"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Services Section */}
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold mb-3 text-slate-800">
//               الخدمات
//             </h2>
//             {firmDetails.services && firmDetails.services.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {firmDetails.services.map((service, index) => (
//                   <div
//                     key={index}
//                     className="bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm text-center"
//                   >
//                     {service.name}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-slate-500">لا توجد خدمات مسجلة</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountingFirmDetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import strings from "../../../Languages/localization";
import {
  Star,
  Users,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  Globe,
  Award,
  Briefcase,
} from "lucide-react";

const AccountingFirmDetails = ({ firmId, onBackToList }) => {
  const [firmData, setFirmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState("en");

  // Initialize language
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    setLanguage(storedLanguage);
    strings.setLanguage(storedLanguage);
    setIsRTL(storedLanguage === "ar");

    // Check HTML document direction and update if needed
    if (storedLanguage === "ar" && document.documentElement.dir !== "rtl") {
      document.documentElement.dir = "rtl";
    } else if (
      storedLanguage !== "ar" &&
      document.documentElement.dir !== "ltr"
    ) {
      document.documentElement.dir = "ltr";
    }
  }, []);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("language") || "en";

      // Only update if language actually changed
      if (newLanguage !== language) {
        setLanguage(newLanguage);
        strings.setLanguage(newLanguage);
        const newIsRTL = newLanguage === "ar";
        setIsRTL(newIsRTL);

        // Force RTL/LTR at document level
        document.documentElement.dir = newIsRTL ? "rtl" : "ltr";
      }
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, [language]);

  useEffect(() => {
    const fetchFirmDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/accounting-firms/${firmId}`
        );
        setFirmData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching firm details:", error);
        setLoading(false);
      }
    };

    fetchFirmDetails();
  }, [firmId]);

  // Rating stars rendering function
  const renderRatingStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }

    return stars;
  };

  // Status badge styles
  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "verified":
        return "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border border-yellow-200";
      case "rejected":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return (
          <CheckCircle
            className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"} text-green-600`}
          />
        );
      case "pending":
        return (
          <Clock
            className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"} text-yellow-600`}
          />
        );
      case "rejected":
        return (
          <XCircle
            className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"} text-red-600`}
          />
        );
      default:
        return null;
    }
  };

  // Get services based on the servicesOffered flag or array
  const getServices = (servicesOffered) => {
    if (!servicesOffered) return [];

    // If servicesOffered is a number (1) but we don't have actual services data,
    // we'll provide a placeholder
    if (typeof servicesOffered === "number" && servicesOffered === 1) {
      return ["Accounting Services"];
    }

    // If it's an array, return it
    if (Array.isArray(servicesOffered)) {
      return servicesOffered;
    }

    return [];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-4">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3"></div>
          <p className="text-sm text-slate-500">{strings.loading}</p>
        </div>
      </div>
    );
  }

  if (!firmData) {
    return (
      <div
        className="p-8 text-center"
        dir={isRTL ? "rtl" : "ltr"}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            {strings.accountingFirms.noDetailsFound}
          </h2>
          <p className="text-slate-600 mb-4">
            {strings.accountingFirms.detailsError}
          </p>
          <button
            onClick={onBackToList}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {strings.actions.backToList}
          </button>
        </div>
      </div>
    );
  }

  // Extract data from the new structure
  const { firmDetails, certification, profile, timestamps } = firmData;
  const firmName = firmDetails?.name || "Unknown";
  const status = firmDetails?.status || "pending";
  const industry = firmDetails?.industry || "Not specified";
  const firmSize = firmDetails?.size || "Not specified";
  const rating = firmDetails?.rating || 0;
  const description = profile?.description || "";
  const image = profile?.image || "";
  const servicesOffered = profile?.servicesOffered || [];
  const certificationDetails = certification?.details || "";
  const commercialRegister = certification?.commercialRegister || "";
  const createdDate = timestamps?.created
    ? new Date(timestamps.created).toLocaleDateString()
    : "";
  const lastUpdated = timestamps?.lastUpdated
    ? new Date(timestamps.lastUpdated).toLocaleDateString()
    : "";

  return (
    <div
      className="p-4 bg-slate-50 min-h-screen"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ textAlign: isRTL ? "right" : "left" }}
    >
      {/* Back Button with improved styling */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={onBackToList}
          className={`flex items-center text-sm bg-white text-blue-600 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all hover:bg-blue-50 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
          {strings.actions.backToList}
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header Card with Firm Overview */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 transition-all hover:shadow-lg">
          <div
            className={`flex flex-col md:flex-row ${
              isRTL ? "md:flex-row-reverse" : ""
            } justify-between items-start md:items-center gap-4 mb-6`}
          >
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{firmName}</h1>
              <div className="flex items-center mt-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyles(
                    status
                  )}`}
                >
                  {getStatusIcon(status)}
                  {strings.status[status] || status}
                </span>
                {createdDate && (
                  <span
                    className={`ml-2 flex items-center text-xs text-slate-500 ${
                      isRTL ? "mr-2 ml-0" : ""
                    }`}
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    {strings.accountingFirms.registered}: {createdDate}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className={`flex ${isRTL ? "ml-2" : "mr-2"}`}>
                {renderRatingStars(rating)}
              </div>
              <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                {rating}/5
              </span>
            </div>
          </div>

          {/* Image if available */}
          {image &&
            image !== "/uploads/profile-images/DefualtUserPicture.jpg" && (
              <div className="flex justify-center mb-6">
                <img
                  src={image}
                  alt={firmName}
                  className="h-40 w-auto object-contain rounded-md border border-slate-200"
                />
              </div>
            )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-blue-500 mb-2" />
              <span className="text-sm font-semibold">{firmSize}</span>
              <span className="text-xs text-slate-500">
                {strings.accountingFirms.firmSize}
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <Briefcase className="w-5 h-5 text-indigo-500 mb-2" />
              <span className="text-sm font-semibold">{industry}</span>
              <span className="text-xs text-slate-500">
                {strings.accountingFirms.industry}
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <FileText className="w-5 h-5 text-yellow-500 mb-2" />
              <span className="text-sm font-semibold">
                {commercialRegister || "N/A"}
              </span>
              <span className="text-xs text-slate-500">
                {strings.accountingFirms.regLabel}
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-orange-500 mb-2" />
              <span className="text-sm font-semibold">
                {lastUpdated || "N/A"}
              </span>
              <span className="text-xs text-slate-500">
                {strings.accountingFirms.lastUpdated}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Industry Information */}
            <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-slate-800 border-b pb-2">
                {strings.accountingFirms.specialization}
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {industry}
                  </span>
                </div>
              </div>
            </div>

            {/* Certification */}
            <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-slate-800 border-b pb-2">
                {strings.accountingFirms.certifications}
              </h2>
              {certificationDetails ? (
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <p className="text-sm text-slate-700">
                      {certificationDetails}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  {strings.accountingFirms.noCertifications}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-slate-800 border-b pb-2">
                {strings.accountingFirms.description}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {description || strings.accountingFirms.noDescription}
              </p>
            </div>

            {/* Services Section */}
            <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-slate-800 border-b pb-2">
                {strings.accountingFirms.services}
              </h2>
              {getServices(servicesOffered).length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {getServices(servicesOffered).map((service, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-3 rounded-lg text-sm border border-blue-100 transition-all hover:shadow-md"
                    >
                      <div className="font-medium">
                        {typeof service === "string"
                          ? service
                          : service.name || "Unknown Service"}
                      </div>
                      {service.description && (
                        <div className="text-xs text-slate-600 mt-1">
                          {service.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">
                    {strings.accountingFirms.noServices}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingFirmDetails;
