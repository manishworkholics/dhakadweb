"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";

const API_URL = "http://143.110.244.163:5000/api";

export default function ChatListPage() {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const messagesEndRef = useRef(null);

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("token")
      : null;

  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;

  const userId = user?._id;


  /* ---------------- HELPERS ---------------- */
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDateLabel = (date) =>
    new Date(date).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------------- CHAT LIST ---------------- */
  const fetchChatList = async () => {
    try {
      setLoadingChats(true);
      const res = await axios.get(`${API_URL}/chat/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatList(res.data.chats || []);
    } catch (err) {
      console.error("Chat list error", err);
    } finally {
      setLoadingChats(false);
    }
  };

  /* ---------------- MESSAGES ---------------- */
  const fetchMessages = async (chatId) => {
    try {
      setLoadingMessages(true);
      const res = await axios.get(`${API_URL}/chat/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages(res.data.messages || []);

      // mark as seen
      await axios.put(
        `${API_URL}/chat/seen/${chatId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchChatList();
    } catch (err) {
      console.error("Fetch messages error", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (!text.trim() || !activeChat) return;

    const tempMessage = {
      _id: `temp-${Date.now()}`,
      sender: { _id: userId },
      message: text,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setText("");
    scrollToBottom();

    try {
      await axios.post(
        `${API_URL}/chat/messages/send`,
        { chatRoomId: activeChat._id, message: tempMessage.message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchMessages(activeChat._id);
    } catch (err) {
      console.error("Send message error", err);
    }
  };

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ---------------- FIRST LOAD ---------------- */
  useEffect(() => {
    fetchChatList();
  }, []);

  /* ---------------- ACTIVE USER ---------------- */
  const activeUser = useMemo(() => {
    if (!activeChat) return null;
    return activeChat.participants.find((p) => p._id.toString() !== userId);
  }, [activeChat, userId]);

  return (
    <DashboardLayout>
      <div className="d-flex border rounded overflow-hidden bg-white" style={{ height: "80vh" }}>
        {/* -------- LEFT: CHAT LIST -------- */}
        <div className="col-4 border-end overflow-auto">
          <div className="p-3 fw-bold border-bottom">Messages</div>

          {loadingChats && <p className="text-center mt-3">Loading chats...</p>}

          {!loadingChats && chatList.length === 0 && (
            <p className="text-center mt-5 text-muted">No conversations yet</p>
          )}

          {chatList.map((chat) => {
            const otherUser = chat.participants.find(
              (p) => p?._id?.toString() !== userId
            );

            return (
              <div
                key={chat._id}
                className={`d-flex align-items-center p-3 cursor-pointer border-bottom ${activeChat?._id === chat._id ? "bg-light" : ""
                  }`}
                onClick={() => {
                  setActiveChat(chat);
                  fetchMessages(chat._id);
                }}
              >
                <img
                  src={otherUser?.photo || "/dhakadweb/assets/images/dummy.png"}
                  className="rounded-circle me-3"
                  width="45"
                  height="45"
                  alt="profile"
                />

                <div className="flex-grow-1 overflow-hidden">
                  <h6 className="mb-0 text-truncate">{otherUser?.name}</h6>
                  <small className="text-muted text-truncate d-block">
                    {chat.lastMessage?.message || "No messages yet"}
                  </small>
                </div>

                {chat.unreadCount > 0 && (
                  <span className="badge bg-danger rounded-pill ms-2">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
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
              <div className="border-bottom p-3 d-flex align-items-center gap-3">
                <img
                  src={activeUser?.photo || "/dhakadweb/assets/images/dummy.png"}
                  className="rounded-circle"
                  width="40"
                  height="40"
                />
                <div>
                  <div className="fw-semibold">{activeUser?.name}</div>
                  <small className="text-muted">Online</small>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-grow-1 overflow-auto p-3 bg-light">
                {loadingMessages && <p>Loading messages...</p>}

                {messages.map((msg, index) => {
                  const isMe = msg?.sender?._id.toString() === userId?.toString();
                  const showDateLabel =
                    index === 0 ||
                    formatDateLabel(messages[index - 1].createdAt) !==
                    formatDateLabel(msg.createdAt);

                  return (
                    <React.Fragment key={msg._id}>
                      {showDateLabel && (
                        <div className="text-center my-3 text-muted small">
                          {formatDateLabel(msg.createdAt)}
                        </div>
                      )}

                      <div
                        className={`mb-2 d-flex ${isMe ? "justify-content-end" : "justify-content-start"
                          }`}
                      >
                        <div
                          className={`px-3 py-2 rounded shadow-sm ${isMe ? "bg-primary text-white" : "bg-white"
                            }`}
                          style={{ maxWidth: "70%" }}
                        >
                          <div>{msg.message}</div>
                          <div className="text-end small opacity-75 mt-1">
                            {formatTime(msg.createdAt)}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
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
                <button className="btn btn-primary px-4" onClick={sendMessage}>
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
