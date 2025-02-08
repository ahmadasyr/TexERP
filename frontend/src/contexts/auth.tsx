"use client";
// Removed unused imports

// Helper functions for localStorage operations
const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
const getLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};

const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
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
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Protected data fetched successfully", data);
    } else {
      console.error("Failed to fetch protected data");
    }
  } catch (error) {
    console.error("An error occurred while fetching protected data", error);
  }
};

export const usePersonnelId = (): number => {
  const personnel = getLocalStorageItem("personnel");
  return personnel.id;
};

const getPersonnelInfo = (): any => {
  const personnel = getLocalStorageItem("personnel");
  return personnel;
};

const getDarkMode = (): boolean => {
  return getLocalStorageItem("darkMode") ?? false;
};

const setDarkMode = (value: boolean): void => {
  setLocalStorageItem("darkMode", value);
};
export {
  handleLogin,
  handleLogout,
  handleRegister,
  fetchProtectedData,
  getPersonnelInfo,
  handleReset,
  getDarkMode,
  setDarkMode,
};
