export default function LoginButton() {
    const handleLogin = () => {
        window.location.href = `${
            import.meta.env.VITE_BACKEND_URL
        }/auth/google`; // backend login route
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded"
        >
            Login with Google
        </button>
    );
}
