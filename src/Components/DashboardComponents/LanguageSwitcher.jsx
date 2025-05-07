// import React from "react";
// import strings from "../../Languages/localization";

// const LanguageSwitcher = () => {
//   const changeLanguage = (language) => {
//     strings.setLanguage(language);
//     // Force component update by triggering a state change in your app
//     // This depends on your app structure
//     // If you're using Redux, you could dispatch an action
//     // For simplicity, you might use a context or a simple event
//     window.dispatchEvent(new Event("languageChanged"));
//   };

//   return (
//     <div className="flex items-center space-x-2 mb-4">
//       <span className="text-sm font-medium text-gray-700">Language:</span>
//       <div className="flex space-x-1">
//         <button
//           onClick={() => changeLanguage("en")}
//           className={`px-2 py-1 text-xs rounded ${
//             strings.getLanguage() === "en"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           English
//         </button>
//         <button
//           onClick={() => changeLanguage("es")}
//           className={`px-2 py-1 text-xs rounded ${
//             strings.getLanguage() === "es"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Español
//         </button>
//         <button
//           onClick={() => changeLanguage("fr")}
//           className={`px-2 py-1 text-xs rounded ${
//             strings.getLanguage() === "fr"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Français
//         </button>
//         <button
//           onClick={() => changeLanguage("ar")}
//           className={`px-2 py-1 text-xs rounded ${
//             strings.getLanguage() === "ar"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           العربية
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LanguageSwitcher;
import React, { useState, useEffect } from "react";
import strings from "../../Languages/localization";

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Initialize from localStorage on component mount
    const storedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(storedLanguage);
    strings.setLanguage(storedLanguage);
  }, []);

  const changeLanguage = (language) => {
    // Save to localStorage
    localStorage.setItem("language", language);

    // Update component state
    setCurrentLanguage(language);

    // Update strings library
    strings.setLanguage(language);

    // Set RTL/LTR at document level
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // Dispatch event to notify app about language change
    window.dispatchEvent(new Event("languageChanged"));

    // Debug info
    console.log(
      `Language changed to: ${language}, Dir: ${document.documentElement.dir}`
    );
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm font-medium text-gray-700">Language:</span>
      <div className="flex space-x-1">
        <button
          onClick={() => changeLanguage("en")}
          className={`px-2 py-1 text-xs rounded ${
            currentLanguage === "en"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("es")}
          className={`px-2 py-1 text-xs rounded ${
            currentLanguage === "es"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Español
        </button>
        <button
          onClick={() => changeLanguage("fr")}
          className={`px-2 py-1 text-xs rounded ${
            currentLanguage === "fr"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Français
        </button>
        <button
          onClick={() => changeLanguage("ar")}
          className={`px-2 py-1 text-xs rounded ${
            currentLanguage === "ar"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          العربية
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
