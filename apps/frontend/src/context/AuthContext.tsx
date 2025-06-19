import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@shared/types";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/profile", {
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                if (res.status === 204) return null; // no user, not an error
                if (!res.ok) throw new Error("Unexpected response");
                return res.json();
            })
            .then((data) => {
                setUser(data?.user ?? null);
            })
            .catch((error) => {
                console.error("Profile fetch failed:", error);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
