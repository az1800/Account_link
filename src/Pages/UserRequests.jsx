import Header from "../Components/Header";
import { useEffect, useState } from "react";
import {diplayUserRequests2,deleteRequest} from "../helperFunctions/DisplayUserRequest";
import { Link,useNavigate } from "react-router-dom";
export default function UserRequests() {
  const [requests, setRequests] = useState();
  let empty;

  useEffect(() => {
    const display = async () => {
      const data = await diplayUserRequests2();
      if(data)
      if (data !== "error") {
        setRequests(data.data);
      } else {
        console.log("something went wrong!!!");
      }
    };
    display();
  }, []);
const nav = new useNavigate();

  const handleAccept = async (id) => {
const confirmed = window.confirm("Are you sure you want to accept this request?");    
if(confirmed){
        const res = await acceptRequest(id);
        if(res===200)
location.reload(); 
        
    }
  };

  const handleReject = async (id) => {


        const res = await deleteRequest(id);
        if(res===200)
location.reload(); 
    
  };

  if (requests&&requests.length<1)
    empty = "There is no requests";
 

function handleRate(ReqId,firmID){
  nav(`/rating?requestId=${ReqId}&firmId=${firmID}`);
};



  return (
    <>
      <Header />
      {empty && <h1 className="text-red-500 text-2xl font-bold text-center my-8">{empty}</h1>}
      
      {requests && requests.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Your Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
        <div key={request._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{request.service && request.service.name ? request.service.name : "N/A"}</h3>
            <div className="text-gray-600 mb-4">
              <p className="mb-1"><span className="font-medium">Firm name:</span> {request.receiver && request.receiver.name ? request.receiver.name : "N/A"}</p>
              <p className="mb-1"><span className="font-medium">Budget:</span>{request.budget} <span style={{ margin: '0 10px' }}></span><span className="font-medium" >Actual price:</span>{request.service && request.service.price ? request.service.price : "N/A"}</p>
              <p className="mb-1"><span className="font-medium">Deadline:</span>{request.deadline}</p>
              <p className="mb-1"><span className="font-medium">Description:</span>{request.description}</p>
{ request.status==="rejected"&&          <p className="mb-1"><span className="font-medium">Reason:</span>{request.rejectionMessage}</p>
}
            </div>
                  <div className="flex space-x-4 mt-4">
            {request.status==="accepted"&&
           <Link to="/ChatPage/client"> <button
                      //onClick={() => handleAccept(request._id)}
                      className="w-30 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      messages
                    </button></Link>
                    }
                    {request.status==="rejected"&&<button
                      onClick={() => handleReject(request._id)}
                      className="w-33 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      delete
                    </button>}
                    {request.status==="pending"&&<button
                      onClick={() => handleReject(request._id)}
                      className="w-33 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Cancel
                    </button>}
                    <p className="mb-1"><span className="font-medium">Status:</span> {request.status}</p>
                  </div>
                  {request.status==="accepted"&&<button onClick={()=>handleRate(request._id,request.receiver._id)}
className="w-33 mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"                    >
                      Rate firm
                    </button>}
                </div>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
