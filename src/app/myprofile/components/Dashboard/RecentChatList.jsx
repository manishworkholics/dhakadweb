// myprofile/components/Dashboard/RecentChatList.jsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://143.110.244.163:5000/api";

export default function RecentChatList() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ FIX: token & user moved to state (SSR safe)
    const [token, setToken] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            setToken(storedToken);
            setLoggedInUser(storedUser ? JSON.parse(storedUser)?._id : null);
        }
    }, []);

    const fetchChatList = async () => {
        if (!token) return;

        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/chat/list`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setChats(res.data.chats || []);
        } catch (err) {
            console.error("Chat fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChatList();
    }, [token]); // ✅ call only after token is ready

    // show max 4 chats only
    const chatsToDisplay = chats.slice(0, 4);

    return (
        <div className="recent-chat-list-card">
            {loading ? (
                <p className="text-center py-2 text-gray-500 text-sm">
                    Loading chats...
                </p>
            ) : chatsToDisplay.length === 0 ? (
                <p className="text-center py-2 text-gray-500 text-sm">
                    No recent chats
                </p>
            ) : (
                <ul className="chat-list py-1">
                    {chatsToDisplay.map((chat) => {
                        // find opponent (not me)
                        const otherUser =
                            chat.participants &&
                            chat.participants.find(
                                (p) => p._id !== loggedInUser
                            );

                        return (
                            <li
                                key={chat._id}
                                className="chat-item flex items-center gap-3 py-2"
                            >
                                {/* Image */}
                                <div className="chat-avatar-wrapper w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={otherUser?.photo || "/default.jpg"}
                                        alt={otherUser?.name}
                                        className="chat-avatar w-full h-full object-cover"
                                    />
                                </div>

                                {/* Name + Last Message */}
                                <div className="chat-info flex-1">
                                    <h6 className="chat-name text-sm font-semibold">
                                        {otherUser?.name || "Unknown User"}
                                    </h6>
                                    <p className="chat-location text-xs text-gray-500">
                                        {chat.lastMessage?.message
                                            ? chat.lastMessage.message
                                            : "No messages yet"}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
