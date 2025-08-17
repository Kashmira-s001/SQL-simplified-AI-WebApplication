import React, { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle, Play, BookOpen, Filter } from 'lucide-react';
import { lessonsData, lessonCategories, Lesson } from '../data/lessonsData';
import { useProgress } from '../contexts/ProgressContext';

const Lessons: React.FC = () => {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const { completedLessons, completeLesson } = useProgress();

  const filteredLessons = lessonsData.filter(lesson => {
    const categoryMatch = selectedCategory === 'all' || lesson.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleLessonToggle = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const handleCompleteLesson = (lessonId: string) => {
    completeLesson(lessonId);
  };

  const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code }) => (
    <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
      <pre className="text-sm">
        <code className="text-green-400 font-mono">{code}</code>
      </pre>
    </div>
  );

  const ResultTable: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                >
                  {cell || <span className="text-gray-400 italic">NULL</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            SQL Lessons
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Master SQL from fundamentals to advanced concepts. Our structured curriculum 
            takes you through each topic with clear explanations, examples, and hands-on practice.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Lessons</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {lessonCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Your Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {completedLessons.size} of {lessonsData.length} lessons completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round((completedLessons.size / lessonsData.length) * 100)}%
              </div>
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedLessons.size / lessonsData.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {filteredLessons.map((lesson: Lesson) => (
            <div
              key={lesson.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Lesson Header */}
              <button
                onClick={() => handleLessonToggle(lesson.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {completedLessons.has(lesson.id) ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Play className="h-6 w-6 text-blue-500" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {lesson.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedLesson === lesson.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>

              {/* Lesson Content */}
              {expandedLesson === lesson.id && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="pt-6">
                    {/* Content */}
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {lesson.content}
                      </div>
                    </div>

                    {/* Example */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Example
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Query:
                          </h5>
                          <CodeBlock code={lesson.example.query} />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Result:
                          </h5>
                          <ResultTable 
                            headers={lesson.example.headers} 
                            rows={lesson.example.output} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Complete Lesson Button */}
                    {!completedLessons.has(lesson.id) && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleCompleteLesson(lesson.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Mark as Complete</span>
                        </button>
                      </div>
                    )}

                    {completedLessons.has(lesson.id) && (
                      <div className="flex justify-end">
                        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No lessons found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your filters to see more lessons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;