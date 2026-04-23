// src/api/profileApi.js
import axios from "axios";
import { buildApiUrl } from "@/lib/api";

export const fetchOwnProfile = async (token) => {
  const res = await axios.get(buildApiUrl("/api/profile/me"), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
