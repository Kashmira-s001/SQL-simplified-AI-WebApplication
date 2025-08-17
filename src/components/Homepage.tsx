import React from 'react';
import { Play, CheckCircle, Users, Award } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

interface HomepageProps {
  setCurrentPage: (page: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ setCurrentPage }) => {
  const { getProgress, completedLessons } = useProgress();
  const progress = getProgress();

  const features = [
    {
      icon: CheckCircle,
      title: 'Interactive Lessons',
      description: 'Learn SQL with hands-on examples and clear explanations'
    },
    {
      icon: Play,
      title: 'Practice Editor',
      description: 'Write and test SQL queries in our interactive editor'
    },
    {
      icon: Award,
      title: 'Quizzes & Challenges',
      description: 'Test your knowledge with interactive quizzes'
    },
    {
      icon: Users,
      title: 'Track Progress',
      description: 'Monitor your learning journey and achievements'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Master SQL from{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Beginner to Pro
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Learn database fundamentals with interactive lessons, hands-on practice, 
              and real-world examples. Start your SQL journey today!
            </p>
            
            {progress > 0 ? (
              <div className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-auto shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome back! 👋
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You've completed {completedLessons.size} lessons
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {progress}% Complete
                  </p>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setCurrentPage('lessons')}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Learning Now
                <Play className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setCurrentPage('practice')}
                className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Try Practice Editor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to master SQL
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources 
              you need for your SQL learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to become an SQL expert?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of learners who have mastered SQL with our interactive platform.
          </p>
          <button
            onClick={() => setCurrentPage('lessons')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;