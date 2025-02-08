"use client";

import ApiImplementation from "@/components/dashboard/api-implementation";
import UserCard from "@/components/dashboard/user";
import { Stack } from "@mui/material";

export default function AuthListener() {
  return (
    <Stack display="flex" direction="row" gap="2rem" justifyContent="center" alignItems="center">
      <UserCard/>
      <ApiImplementation/>
    </Stack>
  );
}