const socketIo = require("socket.io");
const Message = require("./Backend/models/message");
const Conversation = require("./Backend/models/conversation");
const mongoose = require("mongoose");

class SocketService {
  constructor() {
    this.io = null;
  }

  init(server) {
    this.io = socketIo(server, {
      cors: {
        origin: [`http://localhost:3000`, ``],
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log("New client connected");

      // Join conversation room
      socket.on("join_conversation", (conversationId) => {
        socket.join(conversationId);
        console.log(`User joined conversation ${conversationId}`);
      });

      // Send message
      socket.on("send_message", async (messageData) => {
        try {
          // Validate & normalize userType
          console.log(messageData.userType.toLowerCase());
          const userType =
            messageData.userType.toLowerCase() === "acountingfirm"
              ? "firm"
              : messageData.userType.toLowerCase();
          console.log(userType);
          if (!["client", "firm"].includes(userType)) {
            throw new Error(`Invalid userType: ${messageData.userType}`);
          }

          // Validate ObjectIds
          if (
            !mongoose.Types.ObjectId.isValid(messageData.senderId) ||
            !mongoose.Types.ObjectId.isValid(messageData.conversationId)
          ) {
            throw new Error("Invalid ObjectId for senderId or conversationId");
          }

          const newMessage = new Message({
            conversation: messageData.conversationId,
            sender: messageData.senderId,
            userType: userType,
            text: messageData.text,
            file: messageData.file || null,
          });

          await newMessage.save();

          await Conversation.findByIdAndUpdate(messageData.conversationId, {
            lastMessage: messageData.text,
            $inc: { unreadCount: 1 },
          });

          // Emit to everyone in that room
          this.io
            .to(messageData.conversationId)
            .emit("receive_message", newMessage);
        } catch (error) {
          console.error("Error sending message:", error.message);
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    return this.io;
  }

  getIO() {
    if (!this.io) throw new Error("Socket.io not initialized");
    return this.io;
  }
}

module.exports = new SocketService();
