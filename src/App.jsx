import "./index.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { LanguageProvider } from "./Contexts/LanguageContext";
import { UserDataProvider } from "./helperFunctions/UserContext";

// Pages
import HomePage from "./Pages/HomePage";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import SubmitRequestPage from "./Pages/SubmitRequestPage";
import FirmProfilePage from "./Pages/FirmProfilePage";
import EditFirmProfile from "./Pages/EditFirmProfile";
import UpdateProfile from "./Pages/UpdateProfile";
import FirmsPage from "./Pages/FirmsPage";
import ChatPage from "./Pages/ChatPage";
import FirmRequests from "./Pages/FirmRequests";
import UserRequests from "./Pages/UserRequests";
import AdminPage from "./Pages/AdminPage";
import AccountingFirmDetails from "./Components/DashboardComponents/AccountingFirm/AccountingFirmDetails";
import ObjectionTicketDetails from "./Components/DashboardComponents/ObjectionTicket/ObjectionTicketDetails";
import Payment from "./Pages/Payment";
import ServiceRatingPage from "./Pages/ServiceRatingPage";
// Auth
import SignUpPageClient from "./Pages/SignUpPage";
import Login from "./Pages/LoginPage";

// Components (Forms)
import RequestForm from "./Components/RequestForm";
import AccountingFirmSignUp from "./Components/AccountingFirmSignUp";
import ClientSignup from "./Components/ClientSignup";
import AccountingFirmLogIn from "./Components/AccountingFirmLogIn";
import AdminLogin from "./Components/AdminLogin";
import ResetPassword from "./Components/ResetPassword";
function App() {
  return (
    <LanguageProvider>
      <UserDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup-client" element={<SignUpPageClient status="client" />} />
            <Route path="/signup-accountingFirm" element={<SignUpPageClient status="accountingFirm" />} />
            <Route path="/Login-client" element={<Login status="client" />} />
            <Route path="/Login-accountingFirm" element={<Login status="accountingFirm" />} />
            <Route path="/Login-Admin" element={<Login status="admin" />} />
            <Route path="/AboutUsPage" element={<AboutUsPage />} />
            <Route path="/ContactUsPage" element={<ContactUsPage />} />
            <Route path="/SubmitRequest" element={<SubmitRequestPage />} />
            <Route path="/SubmitRequestForm" element={<RequestForm />} />
            <Route path="/FirmProfile/:id" element={<FirmProfilePage />} />
            <Route path="/FirmRequests" element={<FirmRequests />} />
            <Route path="/UserRequests" element={<UserRequests />} />
            <Route path="/EditFirmProfile/:id" element={<EditFirmProfile />} />
            <Route path="/EditFirmProfile/update" element={<UpdateProfile />} />
            <Route path="/FirmsPage" element={<FirmsPage />} />
            <Route path="/ChatPage/:status" element={<ChatPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/rating" element={<ServiceRatingPage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route
              path="/admin/accounting-firms/:id"
              element={<AccountingFirmDetails />}
            />
            <Route
              path="admin/objection-tickets/:id"
              element={<ObjectionTicketDetails />}
            />
            <Route path="/paymant" element={<Payment />} />
            <Route path="/forgetPassword" element={<ResetPassword />} />
          </Routes>
        </Router>
      </UserDataProvider>
    </LanguageProvider>
  );
}

export default App;
