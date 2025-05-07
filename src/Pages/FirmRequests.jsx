import Header from "../Components/Header";
import { diplayRequests } from "../helperFunctions/DisplayFirmRequests";
import { useEffect, useState } from "react";
import { acceptRequest,rejectRequest } from "../helperFunctions/AcceptOrReject";
export default function FirmRequests() {
  const [requests, setRequests] = useState();
  let empty;

  useEffect(() => {
    const display = async () => {
      const data = await diplayRequests();
      if (data !== "error") {
        setRequests(data.data);
      } else {
        console.log("something went wrong!!!");
      }
    };
    display();
  }, []);

  const handleAccept = async (id) => {
const confirmed = window.confirm("Are you sure you want to accept this request?");    
if(confirmed){
        const res = await acceptRequest(id);
        if(res===200)
location.reload(); 
        
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm("Are you sure you want to reject this request?"); 
    if(confirmed){
        const message = prompt("Please enter the reason");
        const res = await rejectRequest(id,message);
        if(res===200)
location.reload(); 
    }
  };

  if (requests&&requests.length<1)
    empty = "There is no requests";
 

  return (
    <>
      <Header />
      {empty && <h1 className="text-red-500 text-2xl font-bold text-center my-8">{empty}</h1>}
      
      {requests && requests.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Firm Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
        <div key={request._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{request.service.name || "Request"}</h3>
            <div className="text-gray-600 mb-4">
              <p className="mb-1"><span className="font-medium">Client name:</span> {request.sender.name}</p>
              <p className="mb-1"><span className="font-medium">Budget:</span>{request.budget} <span style={{ margin: '0 10px' }}></span><span className="font-medium" >Actual price:</span>{request.service.price}</p>
              <p className="mb-1"><span className="font-medium">Deadline:</span>{request.deadline}</p>
              <p className="mb-1"><span className="font-medium">Description:</span>{request.description}</p>
            </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Reject
                    </button>
                    <p className="mb-1"><span className="font-medium">Status:</span> {request.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

