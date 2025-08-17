import React from 'react';
import { FileText, ExternalLink, BookOpen, Video, Code, Database } from 'lucide-react';

const Resources: React.FC = () => {
  const downloadableResources = [
    {
      title: 'SQL Cheat Sheet',
      description: 'Quick reference for all essential SQL commands and syntax',
      icon: FileText,
      type: 'PDF',
      size: '2.1 MB'
    },
    {
      title: 'Database Design Guide',
      description: 'Best practices for designing efficient database schemas',
      icon: Database,
      type: 'PDF',
      size: '3.8 MB'
    },
    {
      title: 'SQL Examples Collection',
      description: 'Collection of practical SQL queries for common scenarios',
      icon: Code,
      type: 'SQL',
      size: '850 KB'
    }
  ];

  const externalResources = [
    {
      title: 'W3Schools SQL Tutorial',
      description: 'Comprehensive SQL tutorial with interactive examples',
      url: 'https://www.w3schools.com/sql/',
      icon: BookOpen,
      category: 'Tutorial'
    },
    {
      title: 'Mode Analytics SQL Tutorial',
      description: 'Advanced SQL tutorial with real-world datasets',
      url: 'https://mode.com/sql-tutorial/',
      icon: BookOpen,
      category: 'Tutorial'
    },
    {
      title: 'SQLBolt Interactive Lessons',
      description: 'Interactive SQL lessons and exercises',
      url: 'https://sqlbolt.com/',
      icon: Code,
      category: 'Interactive'
    },
    {
      title: 'PostgreSQL Documentation',
      description: 'Official PostgreSQL documentation and reference',
      url: 'https://www.postgresql.org/docs/',
      icon: FileText,
      category: 'Documentation'
    },
    {
      title: 'MySQL Tutorial',
      description: 'Official MySQL tutorial and getting started guide',
      url: 'https://dev.mysql.com/doc/mysql-tutorial-excerpt/8.0/en/',
      icon: Database,
      category: 'Documentation'
    },
    {
      title: 'SQL Practice on LeetCode',
      description: 'Practice SQL problems with varying difficulty levels',
      url: 'https://leetcode.com/problemset/database/',
      icon: Code,
      category: 'Practice'
    }
  ];

  const videoResources = [
    {
      title: 'SQL Crash Course',
      description: 'Complete SQL tutorial for beginners (4 hours)',
      platform: 'YouTube',
      duration: '4h',
      icon: Video
    },
    {
      title: 'Advanced SQL Techniques',
      description: 'Learn window functions, CTEs, and advanced queries',
      platform: 'YouTube',
      duration: '2.5h',
      icon: Video
    },
    {
      title: 'Database Design Fundamentals',
      description: 'Learn how to design efficient database schemas',
      platform: 'YouTube',
      duration: '3h',
      icon: Video
    }
  ];

  const handleDownload = (filename: string) => {
    // In a real application, this would trigger an actual download
    alert(`Download would start for: ${filename}\n\n(This is a demo - no actual file will be downloaded)`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Expand your SQL knowledge with our curated collection of resources, 
            including cheat sheets, tutorials, and practice materials.
          </p>
        </div>

        {/* Downloadable Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Downloadable Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadableResources.map((resource, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <resource.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                          {resource.type}
                        </span>
                        <span>{resource.size}</span>
                      </div>
                      <button
                        onClick={() => handleDownload(resource.title)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* External Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            External Learning Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {externalResources.map((resource, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <resource.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {resource.title}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded">
                        {resource.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {resource.description}
                    </p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                    >
                      Visit Resource
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Resources */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Video Tutorials
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoResources.map((resource, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <resource.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                          {resource.platform}
                        </span>
                        <span>{resource.duration}</span>
                      </div>
                      <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors duration-200 flex items-center">
                        Watch
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Study Tips */}
        <section className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Study Tips for SQL Mastery</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Practice Regularly</h3>
              <p className="text-blue-100 text-sm">
                Set aside time each day to practice writing SQL queries. Consistent practice 
                is key to mastering SQL syntax and concepts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Work with Real Data</h3>
              <p className="text-blue-100 text-sm">
                Practice with real datasets to understand how SQL is used in production 
                environments and common data scenarios.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Understand the Theory</h3>
              <p className="text-blue-100 text-sm">
                Learn the underlying concepts of databases, normalization, and relational 
                algebra to write more efficient queries.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Join Communities</h3>
              <p className="text-blue-100 text-sm">
                Participate in SQL forums and communities to learn from others, 
                ask questions, and stay updated with best practices.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;