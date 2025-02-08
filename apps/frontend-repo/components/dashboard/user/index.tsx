import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Card, CardContent, Typography, CircularProgress, Avatar, Box } from "@mui/material";

export default function UserCard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = await currentUser.getIdToken();
        setToken(token);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card sx={{ width: 400, p: 3, boxShadow: 3, borderRadius: 3 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {loading ? (
            <CircularProgress />
          ) : user ? (
            <>
              <Avatar 
                src={user.photoURL || "/default-avatar.png"} 
                alt="Profile" 
                sx={{ width: 100, height: 100, mb: 2, boxShadow: 2 }} 
              />
              <Typography variant="h6" fontWeight="bold">{user.email}</Typography>
              <Typography variant="body2" color="text.secondary">UID: {user.uid}</Typography>
              {token&&<Typography variant="body2" color="text.secondary">Token Bearer: Bearer {token.slice(0,7)+"..."}</Typography>}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  width: "100%",
                  bgcolor: "#eeeeee",
                  borderRadius: 2,
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                  overflow: "auto",
                  maxHeight: 150,
                }}
              >
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </Box>

            </>
          ) : (
            <Typography variant="h6" color="error">
              No user logged in
            </Typography>
          )}
        </CardContent>
      </Card>
  )
}
