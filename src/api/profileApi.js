// src/api/profileApi.js
import axios from "axios";

export const fetchOwnProfile = async (token) => {
  const res = await axios.get("http://143.110.244.163:5000/api/profile/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
