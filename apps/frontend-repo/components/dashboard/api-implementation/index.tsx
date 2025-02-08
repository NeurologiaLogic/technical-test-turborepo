"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { User } from "@monorepo/types";
import { Card, CardContent, Typography, Box, Button, TextField, Alert } from "@mui/material";
import { fetchUserDataThunk, updateUserDataThunk } from "@/store/thrunks/user";
export default function ApiImplementation() {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<User | null>(null);

  // Fetch user data
  const handleFetchUser = async () => {
    console.log("Fetching user data...");
    const user = await dispatch(fetchUserDataThunk("user_001")).unwrap();
    setFormData(user);
  };
  
  // Update user data
  const handleUpdateUser = async() => {
    console.log("Updating user data...");
    if (!formData) return;
    await dispatch(updateUserDataThunk(formData)).unwrap();
    await setFormData(null);
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Card sx={{ width: 400, p: 3, boxShadow: 3, borderRadius: 3 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="bold">User Profile</Typography>
          {!formData &&(
            <>
            {/* Fetch User Data Button */}
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2, mb: 2 }} 
                onClick={handleFetchUser}
                disabled={loading}
              >
                {loading ? "Fetching..." : "Fetch User Data"}
              </Button>
    
              {/* Error Alert */}
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            </>
          )}

          {/* Show User Data in Inputs */}
          {formData && (
            <>
              <TextField
                label="User ID"
                disabled
                name="userId"
                value={formData.userId}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age || ""}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />

              {/* Update User Data Button */}
              <Button 
                variant="contained" 
                color="info" 
                sx={{ mt: 2 }} 
                onClick={handleUpdateUser}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update User Data"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
