
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import {
  FiPrinter,
  FiFileText,
  FiDollarSign,
  FiBriefcase,
  FiBox,
  FiHeadphones,
  FiFile,
  FiLogOut,
} from "react-icons/fi";
import ObjTicket from "../Components/DashboardComponents/ObjectionTicket/ObjTicket";
import AdminAccountingFirmsContainer from "../Components/DashboardComponents/AccountingFirm/AdminAccountingFirmsContainer";
import ClientManagement from "../Components/DashboardComponents/Clients";

// In your AdminPage component
const menuItems = [
  { title: "Objection Tickets", icon: <FiFileText /> },
  { title: "Accounting Firms", icon: <FiDollarSign /> },
  { title: "Client List", icon: <FiBriefcase /> },
];
export default function AdminPage() {
  const [selected, setSelected] = useState("");

  const renderContent = () => {
    switch (selected) {
      case "Objection Tickets":
        return <ObjTicket />;
      case "Accounting Firms":
        return <AdminAccountingFirmsContainer />;
      case "Client List":
        return <ClientManagement />;
      default:
        return <div>Please select an item from the menu</div>;
    }
  };
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar
        menuItems={menuItems}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="flex-1 p-4">{renderContent()}</div>
    </div>
  );
}
