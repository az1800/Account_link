import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import SidebarNavigation from "../Components/SidebarNavigation";
import ChatList from "../Components/ChatList";
import ChatArea from "../Components/ChatArea";
import { UserDataContext } from "../helperFunctions/UserContext";

function ChatPage() {
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const { status } = useParams(); // "client" or "firm"
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  // Only define currentUserId if userData exists
  const currentUserId = userData ? userData._id : null;
  const userType = status;

  return (
    <div className="flex h-screen bg-white w-full overflow-hidden">
      <SidebarNavigation />

      <div className="w-[22%] border-r">
        <ChatList onSelectConversation={setSelectedConversationId} />
      </div>

      <div className="flex-grow">
        {currentUserId && ( // Conditionally render ChatArea
          <ChatArea
            conversationId={selectedConversationId}
            currentUserId={currentUserId}
            userType={userType}
          />
        )}
        {!currentUserId && (
          <div>Loading user data...</div> // Or some other placeholder
        )}
      </div>
    </div>
  );
}

export default ChatPage;