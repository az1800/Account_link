import React from "react";
import {
  MessageCircle,
  Search,
  Home,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Image,
} from "lucide-react";
import { Link } from "react-router-dom";
function SidebarNavigation() {
  // Sample chat messages

  return (
    <>
      {/* Sidebar */}
      <div className="w-56 flex flex-col border-r">
        {/* Logo and navigation */}
        <div className="bg-[#73B6F9] py-4 flex flex-col h-[95%] w-[50%] items-center m-auto rounded-[25px]">
          <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mb-12">
            <span className="text-white font-bold text-xl">D.</span>
          </div>

          <div className="mt-8 w-full">
            <Link to="/">
              {" "}
              <button className="w-full p-3 hover:bg-[#5A94CE] rounded flex justify-center">
                <Home color="#1E40AF" />
              </button>
            </Link>
            <button className="w-full p-3 bg-[#5A94CE] rounded flex justify-center mt-2">
              <MessageCircle color="#1E40AF" />
            </button>
          </div>
          <div className="flex-grow"></div>
          <button className="w-full p-3 hover:bg-[#5A94CE] rounded flex justify-center mb-4">
            <MoreVertical color="#1E40AF" />
          </button>
        </div>
      </div>
    </>
  );
}

export default SidebarNavigation;
