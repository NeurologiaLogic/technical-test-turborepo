import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@monorepo/types";
import { fetchUserData, updateUserData } from "@/apis/user";
import { getAuth } from "firebase/auth";
import { AxiosError } from "axios"; // Import AxiosError type

// Fetch user data thunk
export const fetchUserDataThunk = createAsyncThunk<User, string, { rejectValue: string }>(
  "auth/fetchUserData",
  async (userId, { rejectWithValue }) => {
    console.log("Fetching user data started...");
    const auth = await getAuth().currentUser?.getIdToken();
    
    if (!auth) {
      console.log("No token found, rejecting...");
      return rejectWithValue("No token available");
    }

    try {
      const res = await fetchUserData(auth, userId);

      // No need to check `res.ok` in Axios, as Axios throws an error for non-2xx status codes
      return res
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle Axios-specific errors
        console.error(`Server Error: ${error.response?.status} ${error.response?.statusText}`);
        return rejectWithValue(`Server Error: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        // Handle general errors (network error or something else)
        console.error("Fetch error:", error instanceof Error ? error.message : "Unknown error");
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
      }
    }
  }
);

// Update user data thunk
export const updateUserDataThunk = createAsyncThunk<User, User, { rejectValue: string }>(
  "auth/updateUserData",
  async (data, { rejectWithValue }) => {
    const auth = await getAuth().currentUser?.getIdToken();
    
    if (!auth) {
      console.log("No token found, rejecting...");
      return rejectWithValue("No token available");
    }

    try {
      const res = await updateUserData(auth, data);
      const updatedData: User = res.data; // Axios response data is inside `data`
      return updatedData;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle Axios-specific errors
        return rejectWithValue(`Server Error: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        // Handle general errors (network error or something else)
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
      }
    }
  }
);
