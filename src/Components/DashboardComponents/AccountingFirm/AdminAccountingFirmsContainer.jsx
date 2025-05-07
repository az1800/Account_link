import React, { useState, useEffect } from "react";
import AccountingFirms from "./AccountingFirms";
import AccountingFirmDetails from "./AccountingFirmDetails";

const AdminAccountingFirmsContainer = () => {
  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);

  // Save scroll position when navigating to details
  useEffect(() => {
    if (currentView === "detail") {
      setPreviousScrollPosition(window.scrollY);
      window.scrollTo(0, 0);
    }
  }, [currentView]);

  const handleViewDetails = (firmId) => {
    setSelectedFirmId(firmId);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setSelectedFirmId(null);
    setCurrentView("list");

    // Restore scroll position when returning to list
    setTimeout(() => {
      window.scrollTo(0, previousScrollPosition);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {currentView === "detail" ? (
        <AccountingFirmDetails
          firmId={selectedFirmId}
          onBackToList={handleBackToList}
        />
      ) : (
        <AccountingFirms onViewDetails={handleViewDetails} />
      )}
    </div>
  );
};

export default AdminAccountingFirmsContainer;
