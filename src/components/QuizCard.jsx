const QuizCard = ({ quiz }) => {
    return (
      <div className="bg-color-purple3 shadow rounded-xl overflow-hidden hover:shadow-lg transition">
        <img src={quiz.image} alt={quiz.title} className="w-full h-40 object-cover text-white" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
          <p className="text-sm text-gray-100">{quiz.category}</p>
        </div>
      </div>
    );
  };
  
  export default QuizCard;
  