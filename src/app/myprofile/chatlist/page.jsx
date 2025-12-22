"use client";

import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";

const API_URL = "http://143.110.244.163:5000/api";

export default function ChatListPage() {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  /* ---------------- CHAT LIST ---------------- */
  const fetchChatList = async () => {
    try {
      const res = await axios.get(`${API_URL}/chat/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatList(res.data.chats || []);
    } catch (err) {
      console.error("Chat list error", err);
    }
  };

  /* ---------------- MESSAGES ---------------- */
  const fetchMessages = async (_id) => {
    try {
      const res = await axios.get(
        `${API_URL}/chat/messages/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages(res.data.messages || []);

      // mark seen
    //   await axios.put(
    //     `${API_URL}/chat/seen/${_id}`,
    //     {},
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );

      fetchChatList();
    } catch (err) {
      console.error("Fetch messages error", err);
    }
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (!text.trim() || !activeChat) return;

    try {
      await axios.post(
        `${API_URL}/chat/send`,
        {
          _id: activeChat._id,
          message: text,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setText("");
      fetchMessages(activeChat._id);
    } catch (err) {
      console.error("Send message error", err);
    }
  };

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- FIRST LOAD ---------------- */
  useEffect(() => {
    fetchChatList();
  }, []);

  return (
    <DashboardLayout>
      <div
        className="d-flex border rounded overflow-hidden"
        style={{ height: "80vh" }}
      >
        {/* -------- LEFT: CHAT LIST -------- */}
        <div className="col-4 border-end overflow-auto">
          {chatList.length === 0 && (
            <p className="text-center mt-5 text-muted">No chats found</p>
          )}

          {chatList.map((chat) => (
            <div
              key={chat._id}
              className={`d-flex align-items-center p-3 cursor-pointer ${
                activeChat?._id === chat._id ? "bg-light" : ""
              }`}
              onClick={() => {
                setActiveChat(chat);
                fetchMessages(chat._id);
              }}
            >
              <img
                src={chat.user?.photos?.[0] || "/default-profile.png"}
                className="rounded-circle me-3"
                width="45"
                height="45"
                alt="profile"
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
                      msg.sender._id === userId
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded ${
                        msg.sender._id === userId
                          ? "bg-primary text-white"
                          : "bg-light"
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
