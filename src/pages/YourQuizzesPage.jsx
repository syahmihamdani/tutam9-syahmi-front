import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import QuizCard from "../components/QuizCard";

const YourQuizzesPage = () => {
    const [name, setName] = useState("");
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedName = localStorage.getItem("quizzard_user");
        if (!savedName) {
            navigate("/");
        } else {
            setName(savedName);
            fetchQuizzes(savedName);
        }
    }, [navigate]);

    const fetchQuizzes = async (username) => {
        try {
            const res = await axios.get("https://https://tutam9-syahmi-back.vercel.app/quiz");
            const userQuizzes = res.data.filter(
                (quiz) => quiz.createdBy === username
            );
            setQuizzes(userQuizzes);
        } catch (err) {
            console.error("Failed to fetch user quizzes", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tutam9-syahmi-back.vercel.app/quiz/${id}`);
            setQuizzes(quizzes.filter((q) => q._id !== id));
        } catch (err) {
            console.error("Error deleting quiz", err);
        }
    };

    return (
        <div className="bg-gradient-to-br from-color-purple1 to-color-purple2">
            <div className="flex min-h-screen w-screen">
                <Sidebar />

                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-white">
                            Your Quizzes, {name}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-black">
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <div key={quiz._id} className="relative">
                                    <QuizCard quiz={quiz} />
                                    <button
                                        onClick={() => handleDelete(quiz._id)}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-100 col-span-full text-center">
                                You haven't created any quizzes yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourQuizzesPage;
