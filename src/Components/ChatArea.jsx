import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Paperclip } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useNavigate } from "react-router-dom";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const socket = io(`${process.env.REACT_APP_API_BASE_URL}`);

function ChatArea({ conversationId, currentUserId, userType }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [isDeliverableModalOpen, setIsDeliverableModalOpen] = useState(false);
  const [deliverableFile, setDeliverableFile] = useState(null);
  const [finalDeliverable, setFinalDeliverable] = useState(null);
  const navigate = useNavigate();
  // Custom PDF viewer plugin without print
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          const { Print, ...rest } = slots; // Remove Print
          return (
            <>
              {Object.values(rest).map((Slot, i) => (
                <Slot key={i} />
              ))}
            </>
          );
        }}
      </Toolbar>
    ),
  });

  useEffect(() => {
    if (!conversationId) return;
    socket.emit("join_conversation", conversationId);
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/direct_chat/messages/${conversationId}`
      )
      .then((res) => setChatMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [conversationId]);

  useEffect(() => {
    socket.on("receive_message", (newMsg) => {
      setChatMessages((prev) => [...prev, newMsg]);
    });
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    let fileUrl = null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/direct_chat/upload`,
          formData
        );
        fileUrl = res.data.fileUrl;
      } catch (err) {
        console.error("File upload failed", err);
      }
    }

    const messageData = {
      conversationId,
      senderId: currentUserId,
      userType,
      text: input,
      file: fileUrl,
    };

    socket.emit("send_message", messageData);
    setInput("");
    setFile(null);
  };

  const uploadFinalDeliverable = async () => {
    if (!deliverableFile) return;

    const formData = new FormData();
    formData.append("conversationID", conversationId);
    formData.append("chatFile", deliverableFile);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/direct_chat/send-watermarked-message`,
        formData,
        { withCredentials: true }
      );

      setFinalDeliverable(res.data.fileUrl);
      setIsDeliverableModalOpen(false);
      setDeliverableFile(null);
    } catch (err) {
      console.error("Final deliverable upload failed", err);
    }
    location.reload();
  };

  const getFileExtension = (path) => path?.split(".").pop().toLowerCase();

  const getWatermarkedPath = (filePath) => {
    if (!filePath) return "";
    const parts = filePath.split("/");
    const filename = parts.pop();
    return [...parts, `watermarked-${filename}`].join("/");
  };

  const handlePay = async () => {
    try {
      if (!conversationId) {
        alert("Conversation ID is missing. Please select a conversation.");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/direct_chat/conversation/${conversationId}`
      );
      const request = response.data;

      if (!request || !request.budget) {
        alert("Request details not found or budget is missing.");
        return;
      }

      // Use query parameters instead of state
      navigate(
        `/payment?amount=${request.budget}&requestId=${request._id}&serviceId=${request.service?._id}&conversationId=${conversationId}`
      );
    } catch (error) {
      console.error("Error fetching request details:", error);
      alert(
        error.response?.data?.message ||
          "Failed to fetch request details. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col h-full flex-grow">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-gray-100">
        <h2 className="text-xl font-semibold">Direct Chat</h2>
        {userType !== "client" && (
          <button
            onClick={() => setIsDeliverableModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Final Deliverable
          </button>
        )}
      </div>

      {/* Final Deliverable Preview */}
      {finalDeliverable && (
        <div className="p-4 border-b bg-yellow-50">
          <h3 className="font-semibold text-gray-800 mb-2">
            Final Deliverable Preview:
          </h3>
          {getFileExtension(finalDeliverable) === "pdf" ? (
            <div className="h-[500px] border rounded">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={`${
                    process.env.REACT_APP_API_BASE_URL
                  }${getWatermarkedPath(finalDeliverable)}`}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          ) : (
            <a
              href={`${process.env.REACT_APP_API_BASE_URL}${getWatermarkedPath(
                finalDeliverable
              )}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Show Final File
            </a>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-2 bg-white">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[75%] shadow-md ${
                msg.sender === currentUserId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm break-words">{msg.text}</p>
              {msg.file && (
                <a
                  href={`${process.env.REACT_APP_API_BASE_URL}${msg.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-white underline"
                >
                  <Paperclip size={16} />
                  <span className="text-xs">View File</span>
                </a>
              )}
              <span className="text-xs block mt-1 text-right opacity-80">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex items-center gap-2 bg-gray-100">
        <input
          className="flex-grow p-2 border rounded"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <div className="relative">
          <input
            type="file"
            id="fileUpload"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer flex items-center gap-1 px-3 py-2 border rounded text-sm text-gray-600 hover:bg-gray-200"
          >
            <Paperclip size={16} />
            Upload
          </label>
          {file && (
            <span className="text-xs text-gray-500 ml-2 max-w-[150px] truncate">
              {file.name}
            </span>
          )}
        </div>
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
        <div className="p-4 border-t flex items-center justify-end bg-gray-100">
          {userType === "client" && (
            <button
              onClick={handlePay}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Pay
            </button>
          )}
        </div>
      </div>

      {userType !== "client" && (
        <Dialog
          open={isDeliverableModalOpen}
          onClose={() => setIsDeliverableModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
              <Dialog.Title className="text-lg font-semibold mb-4">
                Upload Final Deliverable
              </Dialog.Title>
              <input
                type="file"
                onChange={(e) => setDeliverableFile(e.target.files[0])}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={() => setIsDeliverableModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-white"
                  onClick={uploadFinalDeliverable}
                >
                  Upload
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default ChatArea;
