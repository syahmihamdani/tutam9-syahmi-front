import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="w-64 bg-white border-r p-6 hidden md:block">
            <div className="flex items-center">
                <img src="/logo.png" alt="Quizzard Logo" className="w-8 h-8 rounded-full" />
                <span className="text-lg font-bold bg-gradient-to-r from-color-purple3 to-color-purple4 inline-block text-transparent bg-clip-text ml-2">Quizzard</span>
            </div>
            <hr className="mt-3 bg-gray-900 mb-3"></hr>
            <ul className="space-y-4 text-gray-700">
                <li
                    className="hover:text-purple-600 cursor-pointer"
                    onClick={() => navigate("/home")}
                >
                    🏠 Home
                </li>
                <li className="hover:text-purple-600 cursor-pointer">📂 Categories</li>
                <li className="hover:text-purple-600 cursor-pointer">📝 Quiz Types</li>
                <li className="hover:text-purple-600 cursor-pointer">📜 History</li>
                <li className="hover:text-purple-600 cursor-pointer">🏆 Leaderboard</li>
                <li
                    className="hover:text-purple-600 cursor-pointer"
                    onClick={() => navigate("/your-quizzes")}
                >
                    🧠 Your Quizzes
                </li>
                <li
                    className="hover:text-purple-600 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    🛑 Log Out
                </li>
            </ul>   
        </div>
    );
};

export default Sidebar;
