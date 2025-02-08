"use client";

import { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login"); // Redirect after successful registration
    } catch (error) {
      console.log("Registration Error:", error);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" color="primary">Register</Typography>
      </Box>
      <TextField 
        label="Email" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <TextField 
        label="Password" 
        type="password" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleRegister} 
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Container>
  );
}
