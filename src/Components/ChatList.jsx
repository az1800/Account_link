import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { listUserChat } from "../helperFunctions/UserChat";
import { listFirmChat } from "../helperFunctions/FirmChat";

function ChatList({ onSelectConversation }) {
  const [clients, setClients] = useState([]);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const userType = pathSegments[pathSegments.length - 1]; // "client" or "firm"
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      const data =
        userType === "client" ? await listUserChat() : await listFirmChat();
      if (data !== "400") {
        setClients(data);
      } else {
        console.error("Something went wrong while fetching chats.");
      }
    };

    fetchConversations();
  }, [userType]);

  const filteredClients = clients.filter((c) => {
    let name;
    if (userType === "client") {
      name = c.firm?.name;
    } else {
      name = c.client?.name;
    }

    const normalizedName = name ? name.toLowerCase() : "";
    return normalizedName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-[30rem] flex flex-col border-r py-2 px-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-4.5 pl-10 rounded-full border text-sm text-black"
        />
        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-black" />
      </div>

      {/* Header */}
      <div className="flex flex-row justify-between w-full px-1">
        <h2 className="font-semibold text-lg mt-4 mb-2">
          {userType === "client" ? "Firms" : "Clients"}
        </h2>
        <Link className="font-semibold mt-[1.8rem] mb-2">Requests</Link>
      </div>

      {/* Conversation List */}
      <div className="overflow-y-auto max-h-[calc(100vh-130px)]">
        {filteredClients.map((client) => {
          const convId = client._id;
          const avatar =
            userType === "client"
              ? `${process.env.REACT_APP_API_BASE_URL}` +
                client.firm?.accountingFirm?.image
              : `${process.env.REACT_APP_API_BASE_URL}/uploads/1741213972306.jpg`;

          const name =
            userType === "client" ? client.firm?.name : client.client?.name;

          return (
            <div
              key={convId}
              className="flex items-center py-3 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectConversation(convId)}
            >
              <div className="mr-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm truncate">{name}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(client.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {client.lastMessage || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;
