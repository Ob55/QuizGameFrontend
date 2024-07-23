import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "./QuizHeader";

const Loading = () => (
  <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
    <p className="text-xl text-gray-500">Loading...</p>
  </div>
);

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [status, setStatus] = useState("");

  // New question state
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);
  const [newAnswer, setNewAnswer] = useState("");

  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetch("/quiz.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching quiz data:", error));

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    setTimerIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
      if (timer <= 0) {
        setShowResult(true);
      }
    };
  }, [timer]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearInterval(timerIntervalId);

    setTimeout(() => {
      const quizScore = calculateScore(answers);
      setScore(quizScore);
      const percentage = (quizScore / questions.length) * 100;
      setStatus(percentage >= 50 ? "Passed" : "Failed");
      setShowResult(true);
      setLoading(false);
    }, 5000);
  };

  const calculateScore = (userAnswers) => {
    const correctAnswers = questions.map((question) => question.answer);
    return Object.keys(userAnswers).reduce((score, questionId) => {
      return userAnswers[questionId] === correctAnswers[questionId - 1] ? score + 1 : score;
    }, 0);
  };

  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setLoading(false);
    setTimer(60);
    navigate("/quiz");
  };

  const handleNewQuestionChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleNewOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  const handleNewAnswerChange = (e) => {
    setNewAnswer(e.target.value);
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (newQuestion && newOptions.length === 2 && newAnswer) {
      const newQuestionObj = {
        id: questions.length + 1,
        question: newQuestion,
        options: newOptions,
        answer: newAnswer,
      };
      try {
        // Assuming you have an API endpoint to handle adding questions
        await fetch('/api/quiz/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newQuestionObj),
        });
        setQuestions((prevQuestions) => [...prevQuestions, newQuestionObj]);
        setNewQuestion("");
        setNewOptions(["", ""]);
        setNewAnswer("");
      } catch (error) {
        console.error("Error adding question:", error);
      }
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  return (
    <section>
      <QuizHeader timer={timer} />
      <div className="md:w-9/12 w-[90%] flex md:flex-row flex-col mx-auto">
        {/* question section */}
        <div className="md:w-[70%] w-full">
          <div>
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="m-3 py-3 px-4 shadow-sm border border-gray-200 rounded"
              >
                <p className="flex items-center rounded text-xs p-2 cursor-pointer">
                  <span className="h-8 w-8 bg-[#FCC822] rounded-full flex justify-center items-center text-green-800 mr-3">
                    {index + 1}
                  </span>
                  <p>{question.question}</p>
                </p>
                <div className="grid grid-cols-2 gap-4 mt-5">
                  {question.options.map((option, index) => (
                    <div
                      className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                        answers[question.id] === option ? "bg-gray-300" : ""
                      }`}
                      key={option}
                      onClick={() => handleAnswerSelect(question.id, option)}
                    >
                      <p className="text-[10px] mb-1">Option {index + 1}</p>
                      <p>{option}</p>
                    </div>
                  ))}
                </div>
                {userRole === "Instructor" && (
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete Question
                  </button>
                )}
              </div>
            ))}
            <button onClick={handleSubmit} className="bg-[#FCC822] px-6 py-2 text-white rounded">
              Submit Quiz
            </button>
          </div>
        </div>

        {/* answer section */}
        <div className="md:w-[30%] w-full p-4">
          {showResult && (
            <div>
              <h3 className="text-2xl font-medium">Your Score: </h3>
              <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
                <h3 className={`text-xl ${status === "Passed" ? "text-green-800" : "text-red-500"}`}>
                  {status}
                </h3>
                <h1 className="text-3xl font-bold my-2">
                  {score * 10}
                  <span className="text-slate-800">/60</span>
                </h1>
                <p className="text-sm flex justify-center items-center gap-2">
                  Total Time:{" "}
                  <span className="text-xl text-orange-500">
                    {formatTime(60 - timer)}
                    <span className="text-xs">sec</span>
                  </span>
                </p>
              </div>
              <button
                onClick={restartQuiz}
                className="bg-[#FCC822] text-white w-full py-2 rounded mt-16"
              >
                Restart
              </button>
            </div>
          )}

          {loading && <Loading />}
        </div>
      </div>

      {/* Add Question Form */}
      {userRole === "Instructor" && (
        <div className="md:w-9/12 w-[90%] mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Add a New Question</h2>
          <form onSubmit={handleAddQuestion} className="bg-white p-6 shadow-md rounded">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Question</label>
              <input
                type="text"
                value={newQuestion}
                onChange={handleNewQuestionChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            {newOptions.map((option, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-gray-700 text-sm font-bold mb-2">Option {index + 1}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleNewOptionChange(index, e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Answer</label>
              <input
                type="text"
                value={newAnswer}
                onChange={handleNewAnswerChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#FCC822] px-6 py-2 text-white rounded"
            >
              Add Question
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Quiz;
