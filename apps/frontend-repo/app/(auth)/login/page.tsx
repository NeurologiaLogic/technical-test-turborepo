"use client";

import { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect after login
    } catch (error) {
      console.log(error)
      setError("Invalid login credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" color="primary">Login</Typography>
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
        onClick={handleLogin} 
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Don’t have an account? <Link href="/register">Register</Link>
      </Typography>
    </Container>
  );
}
