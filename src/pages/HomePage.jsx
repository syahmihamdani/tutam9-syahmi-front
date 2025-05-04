import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import QuizCard from "../components/QuizCard";

const HomePage = () => {
  const [name, setName] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("quizzard_user");

    if (!savedName) {
      navigate("/");
    } else {
      setName(savedName);

      axios
        .get("https://tutam9-syahmi-back.vercel.app/quiz")
        .then((response) => {
          setQuizzes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
          setQuizzes([]); 
        });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gradient-to-br from-color-purple1 to-color-purple2">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Welcome to Quizzard, {name}!
          </h1>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            onClick={() => navigate("/add-quiz")}
          >
            + Add Quiz
          </button>
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-black">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))
          ) : (
            <p className="text-gray-100 col-span-full text-center">
              No quizzes yet. Be the first to create one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
