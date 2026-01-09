"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";

const API_URL = "http://143.110.244.163:5000/api";

export default function ChatListPage() {
  const [chatList, setChatList] = useState([]);
  const [chatRequests, setChatRequests] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);

  /* ---------------- AUTH ---------------- */
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const userId = user?._id;

  /* ---------------- HELPERS ---------------- */
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDateLabel = (date) =>
    new Date(date).toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  /* ---------------- CHAT REQUESTS ---------------- */
  const fetchChatRequests = async () => {
    try {
      setLoadingRequests(true);
      const res = await axios.get(`${API_URL}/chat/request`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatRequests(res.data.requests || []);
    } catch (err) {
      console.error("Chat request error", err);
    } finally {
      setLoadingRequests(false);
    }
  };

  const respondToRequest = async (chatRoomId, action) => {
    try {
      await axios.put(
        `${API_URL}/chat/respond`,
        { chatRoomId, action }, // accept | reject
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchChatRequests();
      fetchChatList();
    } catch (err) {
      console.error("Respond error", err);
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
    if (!text.trim() || !activeChat || activeChat.status !== "active") return;

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

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    fetchChatList();
    fetchChatRequests();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  /* ---------------- ACTIVE USER ---------------- */
  const activeUser = useMemo(() => {
    if (!activeChat) return null;
    return activeChat.participants.find(
      (p) => p._id.toString() !== userId
    );
  }, [activeChat, userId]);

  return (
    <DashboardLayout>
      <div
        className="d-flex border rounded overflow-hidden bg-white"
        style={{ height: "75vh" }}
      >
        {/* -------- LEFT PANEL (CHAT LIST) -------- */}
        {(!isMobile || !activeChat) && (
          <div className="col-12 col-md-4 border-end overflow-auto">

            {/* CHAT REQUESTS */}
            {chatRequests.length > 0 && (
              <>
                <div className="p-3 fw-bold border-bottom bg-light">
                  Chat Requests
                </div>

                {chatRequests.map((req) => {
                  const sender = req.participants.find(
                    (p) => p._id.toString() !== userId
                  );

                  return (
                    <div key={req._id} className="p-3 border-bottom">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={
                            sender?.photo ||
                            "/dhakadweb/assets/images/dummy.png"
                          }
                          className="rounded-circle"
                          width="40"
                          height="40"
                        />
                        <div className="flex-grow-1">
                          <div className="fw-semibold">{sender?.name}</div>
                          <small className="text-muted">wants to chat</small>
                        </div>
                      </div>

                      <div className="d-flex gap-2 mt-2">
                        <button
                          className="btn btn-sm btn-success w-100"
                          onClick={() => respondToRequest(req._id, "accept")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger w-100"
                          onClick={() => respondToRequest(req._id, "reject")}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* CHAT LIST */}
            {chatList.map((chat) => {
              const otherUser = chat.participants.find(
                (p) => p._id.toString() !== userId
              );

              return (
                <div
                  key={chat._id}
                  className={`d-flex align-items-center p-3 cursor-pointer border rounded-3 my-3 mx-2 ${activeChat?._id === chat._id ? "bg-light" : ""
                    }`}
                  onClick={() => {
                    const otherUser = chat.participants.find(
                      (p) => p._id.toString() !== userId
                    );

                    setActiveChat(chat);
                    setActiveUser(otherUser);   // ✅ THIS WAS MISSING
                    fetchMessages(chat._id);
                  }}
                >
                  <img
                    src={
                      otherUser?.photo ||
                      "/dhakadweb/assets/images/dummy.png"
                    }
                    className="rounded-circle me-3"
                    width="45"
                    height="45"
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <h6 className="mb-0 text-truncate">{otherUser?.name}</h6>
                    <small className="text-muted text-truncate d-block">
                      {chat.lastMessage?.message || "No messages yet"}
                    </small>
                  </div>
                </div>
              );
            })}

            {!loadingChats &&
              chatList.length === 0 &&
              chatRequests.length === 0 && (
                <p className="text-center mt-5 text-muted">
                  No conversations yet
                </p>
              )}
          </div>
        )}

        {/* -------- RIGHT PANEL (CHAT WINDOW) -------- */}
        {(!isMobile || activeChat) && (
          <div className="col-12 col-md-8 d-flex flex-column">
            {!activeChat ? (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                Select a chat to start messaging
              </div>
            ) : (
              <>
                <div className="border-bottom p-3 d-flex align-items-center gap-2">
                  {isMobile && (
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => setActiveChat(null)}
                    >
                      ←
                    </button>
                  )}

                  <img
                    src={
                      activeUser?.photo ||
                      "/dhakadweb/assets/images/dummy.png"
                    }
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <div>
                    <div className="fw-semibold">{activeUser?.name}</div>
                    <small className="text-muted">
                      {activeChat.status === "active"
                        ? "Online"
                        : "Chat request pending"}
                    </small>
                  </div>
                </div>

                <div className="flex-grow-1 overflow-auto p-3 bg-light">
                  {messages.map((msg) => {
                    const isMe =
                      msg.sender?._id.toString() === userId.toString();

                    return (
                      <div
                        key={msg._id}
                        className={`mb-2 d-flex ${isMe
                          ? "justify-content-end"
                          : "justify-content-start"
                          }`}
                      >
                        <div
                          className={`px-3 py-2 rounded ${isMe
                            ? "bg-primary text-white"
                            : "bg-white"
                            }`}
                        >
                          {msg.message}
                          <div className="text-end small opacity-75">
                            {formatTime(msg.createdAt)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {activeChat.status !== "active" ? (
                  <div className="p-3 text-center text-muted border-top">
                    Chat will start after request is accepted
                  </div>
                ) : (
                  <div className="border-top p-3 d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a message..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && sendMessage()
                      }
                    />
                    <button
                      className="btn btn-primary px-4"
                      onClick={sendMessage}
                    >
                      Send
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

    </DashboardLayout>
  );
}
