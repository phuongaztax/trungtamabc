"use client";

import { getAuth, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore/lite";
import { createContext, useContext, useEffect, useState } from "react";
import { app, db } from "@/lib/firebase";

export const auth = getAuth(app);

type AuthState = {
  user: User | null;
  /** Tài khoản có trong collection `admins` → được đăng bài */
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  isAdmin: false,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Omit<AuthState, "logout">>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, isAdmin: false, loading: false });
        return;
      }
      let isAdmin = false;
      try {
        isAdmin = (await getDoc(doc(db, "admins", user.uid))).exists();
      } catch {
        isAdmin = false;
      }
      setState({ user, isAdmin, loading: false });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, logout: () => signOut(auth) }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
