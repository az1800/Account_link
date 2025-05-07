import { MDBBtn, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Header from "./Header";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../Contexts/LanguageContext";
import sendReq from "../helperFunctions/sendRequestData";

function RequestForm({ serviceID }) {
  const { language } = useContext(LanguageContext);
  const isArabic = language === "Ar";
  const navigate = useNavigate();

  // Refs for input fields
  const budgetRef = useRef(null);
  const dateRef = useRef(null);
  const desRef = useRef(null);

  async function sendData(event) {
    event.preventDefault(); // Prevent default form submission



    const budget = budgetRef.current.value;
    const date = dateRef.current.value; // `DatePicker` uses ref differently
    const des = desRef.current.value;

    try {
      const res = await sendReq(serviceID, des, budget, date);
      console.log(res);
      navigate('/');
    } catch (error) {
      console.log("Something went wrong !!!!", error);
    }
  }

  return (
    <form onSubmit={sendData} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className={isArabic ? "text-right" : "text-left"}>
        <h1 className="text-2xl font-bold mb-8">
          {isArabic ? "نموذج الطلب" : "Request Form"}
        </h1>
        <div className="space-y-6">
          {/* Budget Input */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              {isArabic ? "الميزانية" : "Budget"}
            </label>
            <input
              type="number"
              id="budget"
              ref={budgetRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={isArabic ? "الميزانية" : "Enter budget"}
            />
          </div>

          {/* Date Input */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              {isArabic ? "تحديد الموعد النهائي" : "Select Deadline"}
            </label>
            <input
              type="date"
              id="date"
              ref={dateRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              {isArabic ? "وصف المشكلة" : "Description of problem"}
            </label>
            <textarea
              id="description"
              ref={desRef}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={isArabic ? "وصف المشكلة" : "Enter description"}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isArabic ? "ارسال" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default RequestForm;