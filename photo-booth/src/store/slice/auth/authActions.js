import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../api/axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      //  API call
      const response = await instance.post("/auth/signup", userData);
     
      return response.data;
    } catch (error) {
        console.error("Signup error:", error);
      return rejectWithValue(error.message);
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API call
      const response = await instance.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
