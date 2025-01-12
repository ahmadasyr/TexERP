"use client";
import { useEffect, useState } from "react";

// Helper functions for localStorage operations
const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getLocalStorageItem = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

// Authentication handlers
const handleLogin = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setLocalStorageItem("token", data.token);
      setLocalStorageItem("personnel", data.personnel);
      window.dispatchEvent(new Event("login"));
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("An error occurred during login.");
  }
};

const handleReset = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch("/api/auth/reset", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setLocalStorageItem("token", data.token);
      setLocalStorageItem("personnel", data.personnel);
      window.dispatchEvent(new Event("login"));
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("An error occurred during login.");
  }
};

const handleLogout = (): void => {
  removeLocalStorageItem("token");
  removeLocalStorageItem("personnel");

  // Trigger a custom event to notify other components
  window.dispatchEvent(new Event("logout"));
};

const handleRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  username: string
): Promise<void> => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password, username }),
    });

    const data = await response.json();
    if (response.ok) {
      setLocalStorageItem("token", data.token);
      setLocalStorageItem("personnel", data.personnel);
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("An error occurred during registration.");
  }
};

const fetchProtectedData = async (): Promise<void> => {
  try {
    const token = getLocalStorageItem("token");

    const response = await fetch("/api/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
    } else {
    }
  } catch (error) {}
};

// React state and hooks
export const usePersonnelId = (): number => {
  return localStorage.personnel.id;
};

const getPersonnelInfo = (): any => {
  const personnel = getLocalStorageItem("personnel");
  return personnel;
};

export {
  handleLogin,
  handleLogout,
  handleRegister,
  fetchProtectedData,
  getPersonnelInfo,
  handleReset,
};
