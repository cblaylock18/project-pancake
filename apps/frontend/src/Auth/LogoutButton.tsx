import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
    const { setUser } = useAuth();

    const handleLogout = async () => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null); // clears local user state
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
}
