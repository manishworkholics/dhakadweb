// src/redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOwnProfile } from "../../api/profileApi";

export const loadOwnProfile = createAsyncThunk(
  "profile/loadOwnProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      const data = await fetchOwnProfile(token);
      console.log("PROFILE API RESPONSE:", data);

      return data;
    } catch (err) {
      console.log("PROFILE LOAD ERROR:", err);
      return rejectWithValue(err.response?.data || "Failed to load profile");
    }
  }
);


const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    hasPremiumAccess: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.hasPremiumAccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOwnProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadOwnProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.hasPremiumAccess = action.payload.hasPremiumAccess;
      })
      .addCase(loadOwnProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
