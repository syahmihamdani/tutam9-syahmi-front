import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleStart = () => {
        if (name.trim()) {
            localStorage.setItem("quizzard_user", name);
            navigate("/home");

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-color-purple1 to-color-purple2 w-screen">
            <div className="bg-gradient-to-tl from-color-purple3 to-color-purple4 p-8 rounded-2xl w-full max-w-md shadow-xl text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Welcome to Quizzard</h1>
                <p className="text-gray-200 mb-4">Enter your name to begin:</p>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    onClick={handleStart}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    Start Quizzing!
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
