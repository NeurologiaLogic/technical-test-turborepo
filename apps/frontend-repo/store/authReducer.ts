import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserDataThunk, updateUserDataThunk } from "@/store/thrunks/user";
import { User } from "@monorepo/types";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setTokenAction: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchUserData
    builder.addCase(fetchUserDataThunk.pending, (state) => {
      console.log("fetchUserDataThunk.pending - Setting loading to true");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserDataThunk.fulfilled, (state, action) => {
      console.log("fetchUserDataThunk.fulfilled - Setting loading to false, payload:",action);
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserDataThunk.rejected, (state, action) => {
      console.log("fetchUserDataThunk.rejected - Setting loading to false, error:", action);
      state.loading = false;
      state.error = action.payload as string;
    });


    // Handle updateUserData
    builder.addCase(updateUserDataThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserDataThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; 
    });
    builder.addCase(updateUserDataThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setUserAction, setTokenAction } = authSlice.actions;
export default authSlice.reducer;
