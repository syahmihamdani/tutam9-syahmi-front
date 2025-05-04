import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage"; // make this later
import AddQuizPage from "./pages/AddQuizPage";
import YourQuizzesPage from "./pages/YourQuizzesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-quiz" element={<AddQuizPage />} />
        <Route path="/your-quizzes" element={<YourQuizzesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
