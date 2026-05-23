"use client";

import { logout } from "@/app/action/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ButtonLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handler() {
    setLoading(true);
    try {
      const result = await logout();
      if (result.success) {
        toast.success("Logged out successfully");
        router.push("/login");
        router.refresh();
      }
    } catch {
      toast("somthing wrong, you can't logouted");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button onClick={handler} disabled={loading}>
      Logout
    </Button>
  );
};

export default ButtonLogout;
