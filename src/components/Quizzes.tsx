import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Award, Brain } from 'lucide-react';
import { quizzesData, Quiz, QuizQuestion } from '../data/quizzesData';
import { useProgress } from '../contexts/ProgressContext';

const Quizzes: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { quizScores, setQuizScore } = useProgress();

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (selectedQuiz && currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return;

    const score = selectedQuiz.questions.reduce((total, question) => {
      const selectedAnswer = selectedAnswers[question.id];
      return total + (selectedAnswer === question.correctAnswer ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    setQuizScore(selectedQuiz.id, percentage);
    setShowResults(true);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              SQL Quizzes
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Test your SQL knowledge with interactive quizzes. Each quiz covers specific topics 
              and provides immediate feedback on your answers.
            </p>
          </div>

          {/* Quizzes Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {quizzesData.map((quiz) => {
              const score = quizScores[quiz.id];
              const hasCompleted = score !== undefined;

              return (
                <div
                  key={quiz.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {quiz.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {quiz.questions.length} questions
                          </p>
                        </div>
                      </div>
                      {hasCompleted && (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(score)} ${getScoreColor(score)}`}>
                          {score}%
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {quiz.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleQuizSelect(quiz)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        {hasCompleted ? 'Retake Quiz' : 'Start Quiz'}
                      </button>
                      
                      {hasCompleted && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <Award className="h-4 w-4" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = selectedQuiz.questions.reduce((total, question) => {
      const selectedAnswer = selectedAnswers[question.id];
      return total + (selectedAnswer === question.correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${getScoreBgColor(percentage)}`}>
              {percentage >= 80 ? (
                <Award className={`h-12 w-12 ${getScoreColor(percentage)}`} />
              ) : (
                <Brain className={`h-12 w-12 ${getScoreColor(percentage)}`} />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Results
            </h1>
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(percentage)}`}>
              {percentage}%
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              You got {score} out of {selectedQuiz.questions.length} questions correct
            </p>
          </div>

          {/* Question Review */}
          <div className="space-y-6 mb-8">
            {selectedQuiz.questions.map((question: QuizQuestion, index) => {
              const selectedAnswer = selectedAnswers[question.id];
              const isCorrect = selectedAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start space-x-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selectedAnswer === optionIndex;
                          const isCorrectAnswer = optionIndex === question.correctAnswer;
                          
                          let className = 'p-3 rounded-lg border ';
                          if (isCorrectAnswer) {
                            className += 'border-green-300 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300';
                          } else if (isSelected) {
                            className += 'border-red-300 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300';
                          } else {
                            className += 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
                          }

                          return (
                            <div key={optionIndex} className={className}>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">
                                  {String.fromCharCode(65 + optionIndex)}.
                                </span>
                                <span>{option}</span>
                                {isCorrectAnswer && (
                                  <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                                )}
                                {isSelected && !isCorrectAnswer && (
                                  <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleQuizSelect(selectedQuiz)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={resetQuiz}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = selectedQuiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === selectedQuiz.questions.length - 1;
  const hasAnsweredAll = selectedQuiz.questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedQuiz.title}
            </h1>
            <button
              onClick={resetQuiz}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              ← Back to Quizzes
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Question {currentQuestion + 1} of {selectedQuiz.questions.length}
          </p>
        </div>

        {/* Current Question */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQ.id, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQ.id] === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {selectedQuiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[selectedQuiz.questions[index].id] !== undefined
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {isLastQuestion ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={!hasAnsweredAll}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;