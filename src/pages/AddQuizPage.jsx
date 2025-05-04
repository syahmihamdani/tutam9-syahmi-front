import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categories = ["🚩 Flags", "©️ Logos", "💡 General Knowledge"];

const AddQuizPage = () => {
    const navigate = useNavigate();
    const [creator, setCreator] = useState("");
    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        category: "",
        questions: [],
        createdBy: "",  // added
    });

    useEffect(() => {
        const username = localStorage.getItem("quizzard_user");
        if (!username) return navigate("/");
        setCreator(username);
    }, [navigate]);

    const handleQuestionChange = (index, field, value) => {
        const updated = [...quiz.questions];
        updated[index][field] = value;
        setQuiz({ ...quiz, questions: updated });
    };

    const handleChoiceChange = (qIndex, cIndex, value) => {
        const updated = [...quiz.questions];
        updated[qIndex].choices[cIndex] = value;
        setQuiz({ ...quiz, questions: updated });
    };

    const addQuestion = () => {
        setQuiz({
            ...quiz,
            questions: [
                ...quiz.questions,
                {
                    type: "multiple",
                    prompt: "",
                    choices: ["", "", "", ""],
                    correctAnswer: "",
                    image_url: "",
                },
            ],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdBy = localStorage.getItem("quizzard_user");

        const res = await axios.post("https://tutam9-syahmi-front.vercel.app/quiz", {
            ...quiz,
            createdBy,
        });

        if (res.status === 201) {
            alert("Quiz created!");
            navigate("/home");
        }
    };



    return (
        <div className=" mx-auto py-10 px-6 h-screen w-screen bg-gradient-to-br from-color-purple1 to-color-purple2">
            <h2 className="text-3xl font-bold text-white mb-6">Create a New Quiz</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    placeholder="Quiz title"
                    className="w-full border p-2 rounded text-white"
                    value={quiz.title}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    className="w-full border p-2 rounded text-white"
                    value={quiz.description}
                    onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                    required
                />
                <select
                    className="w-full border p-2 rounded font-white"
                    value={quiz.category}
                    onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
                    required
                >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                {/* Questions */}
                <div className="space-y-6">
                    {quiz.questions.map((q, i) => (
                        <div key={i} className="border p-4 rounded bg-black">
                            <h4 className="font-semibold text-lg mb-2">Question {i + 1}</h4>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        const updated = [...quiz.questions];
                                        updated[i].image_url = reader.result;
                                        setQuiz({ ...quiz, questions: updated });
                                    };
                                    reader.readAsDataURL(file);
                                }}
                                className="mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Question prompt"
                                className="w-full border p-2 mb-2 rounded"
                                value={q.prompt}
                                onChange={(e) => handleQuestionChange(i, "prompt", e.target.value)}
                                required
                            />
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {q.choices.map((choice, ci) => (
                                    <input
                                        key={ci}
                                        type="text"
                                        placeholder={`Choice ${ci + 1}`}
                                        className="border p-2 rounded"
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(i, ci, e.target.value)}
                                        required
                                    />
                                ))}
                            </div>
                            <select
                                className="w-full border p-2 rounded"
                                value={q.correctAnswer}
                                onChange={(e) => handleQuestionChange(i, "correctAnswer", e.target.value)}
                                required
                            >
                                <option value="">Select correct answer</option>
                                {q.choices.map((choice, ci) => (
                                    <option key={ci} value={choice}>
                                        {choice || `Choice ${ci + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    + Add Question
                </button>

                <button
                    type="submit"
                    className="block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                >
                    Submit Quiz
                </button>
            </form>
        </div>
    );
};

export default AddQuizPage;
