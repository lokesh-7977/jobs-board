"use client"; // Needed for Client-side rendering

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
// Define the context type
interface UserContextType {
  userId: string | null;
  setUserId: (id: string) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: session } = useSession(); // Get session from NextAuth

  // Set userId from the session when it becomes available
  useEffect(() => {
    if (session?.user) {
      // Assuming `id` is part of session.user, replace 'id' with actual property
      setUserId(session.user.id || null);
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
