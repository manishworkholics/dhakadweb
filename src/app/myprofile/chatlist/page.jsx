




"use client";

import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import io from "socket.io-client";
import axios from "axios";

const API_URL = "http://143.110.244.163:5000/api";
const SOCKET_URL = "http://143.110.244.163:5000";

let socket;

export default function ChatListPage() {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const userId = typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  /* ---------------- CHAT LIST ---------------- */
  const fetchChatList = async () => {
    const res = await axios.get(`${API_URL}/chat/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setChatList(res.data.chats);
  };

  /* ---------------- MESSAGES ---------------- */
  const fetchMessages = async (chatRoomId) => {
    const res = await axios.get(`${API_URL}/chat/messages/${chatRoomId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(res.data.messages);

    socket.emit("markSeen", { chatRoomId, userId });
  };

  /* ---------------- SOCKET INIT ---------------- */
  useEffect(() => {
    socket = io(SOCKET_URL, {
      auth: { token },
    });

    socket.on("receiveMessage", (msg) => {
      if (msg.chatRoom === activeChat?.chatRoomId) {
        setMessages((prev) => [...prev, msg]);
        socket.emit("markSeen", { chatRoomId: activeChat.chatRoomId, userId });
      }
      fetchChatList();
    });

    socket.on("updateChatList", fetchChatList);

    return () => socket.disconnect();
  }, [activeChat]);

  /* ---------------- FIRST LOAD ---------------- */
  useEffect(() => {
    fetchChatList();
  }, []);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      chatRoomId: activeChat.chatRoomId,
      senderId: userId,
      message: text,
    });

    setText("");
  };

  return (
    <DashboardLayout>
      <div className="d-flex border rounded overflow-hidden" style={{ height: "80vh" }}>
        
        {/* -------- LEFT: CHAT LIST -------- */}
        <div className="col-4 border-end overflow-auto">
          {chatList.map((chat) => (
            <div
              key={chat.chatRoomId}
              className={`d-flex align-items-center p-3 cursor-pointer ${
                activeChat?.chatRoomId === chat.chatRoomId ? "bg-light" : ""
              }`}
              onClick={() => {
                setActiveChat(chat);
                fetchMessages(chat.chatRoomId);
                socket.emit("joinRoom", { chatRoomId: chat.chatRoomId });
              }}
            >
              <img
                src={chat.user?.photos?.[0] || "/default-profile.png"}
                className="rounded-circle me-3"
                width="45"
                height="45"
              />
              <div className="flex-grow-1">
                <h6 className="mb-0">{chat.user?.name}</h6>
                <small className="text-muted">
                  {chat.lastMessage?.message || "No messages yet"}
                </small>
              </div>

              {chat.unreadCount > 0 && (
                <span className="badge bg-danger rounded-pill">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* -------- RIGHT: CHAT WINDOW -------- */}
        <div className="col-8 d-flex flex-column">
          {!activeChat ? (
            <div className="d-flex align-items-center justify-content-center h-100 text-muted">
              Select a chat to start messaging
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="border-bottom p-3 fw-semibold">
                {activeChat.user?.name}
              </div>

              {/* Messages */}
              <div className="flex-grow-1 overflow-auto p-3">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`mb-2 d-flex ${
                      msg.sender._id === userId ? "justify-content-end" : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded ${
                        msg.sender._id === userId ? "bg-primary text-white" : "bg-light"
                      }`}
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-top p-3 d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="btn btn-primary" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
