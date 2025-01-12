"use client";
import { handleLogout } from "@/contexts/auth";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  handleLogout();
  const router = useRouter();
  router.push("/login");
  return null;
}
