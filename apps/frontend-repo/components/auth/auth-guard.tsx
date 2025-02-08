import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth"; // Import User type
import { auth } from "@/config/firebase";
import { Box } from "@mui/material";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [, setUser] = useState<User | null>(null); // Explicit type

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Now TypeScript knows user is User | null
      setLoading(false);

      // Redirect if not logged in and not on an auth page
      if (!currentUser && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
        router.push("/login");
        return;
      }
      router.push("/dashboard");
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) return <Box sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}>Loading...</Box>;

  return <>{children}</>;
}
