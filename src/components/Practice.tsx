import React, { useState } from 'react';
import { Play, Database, Eye, EyeOff } from 'lucide-react';
import { sampleTables, queryResults } from '../data/sampleTables';

const Practice: React.FC = () => {
  const [query, setQuery] = useState('SELECT * FROM students;');
  const [result, setResult] = useState<{ headers: string[], rows: string[][] } | null>(null);
  const [error, setError] = useState('');
  const [showTables, setShowTables] = useState(true);

  const handleRunQuery = () => {
    setError('');
    setResult(null);

    const cleanQuery = query.trim().toLowerCase();
    
    // Simple query matching for demo purposes
    const matchedResult = Object.entries(queryResults).find(([key]) => 
      key.toLowerCase() === cleanQuery
    );

    if (matchedResult) {
      setResult(matchedResult[1]);
    } else {
      // Default behavior for unrecognized queries
      if (cleanQuery.includes('select')) {
        if (cleanQuery.includes('students')) {
          setResult({
            headers: sampleTables.students.headers,
            rows: sampleTables.students.rows
          });
        } else if (cleanQuery.includes('employees')) {
          setResult({
            headers: sampleTables.employees.headers,
            rows: sampleTables.employees.rows
          });
        } else if (cleanQuery.includes('orders')) {
          setResult({
            headers: sampleTables.orders.headers,
            rows: sampleTables.orders.rows
          });
        } else {
          setError('Table not found. Available tables: students, employees, orders');
        }
      } else {
        setError('Only SELECT queries are supported in this practice environment.');
      }
    }
  };

  const exampleQueries = [
    'SELECT * FROM students;',
    'SELECT first_name, last_name FROM students;',
    'SELECT * FROM students WHERE age > 20;',
    'SELECT * FROM employees WHERE department = "Engineering";',
    'SELECT department, COUNT(*) as count FROM employees GROUP BY department;',
    'SELECT * FROM orders ORDER BY price DESC;'
  ];

  const Table: React.FC<{ data: typeof sampleTables.students }> = ({ data }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h4 className="font-semibold text-gray-900 dark:text-white capitalize flex items-center">
          <Database className="h-4 w-4 mr-2" />
          {data.name}
        </h4>
      </div>
      <div className="overflow-x-auto max-h-64">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ResultTable: React.FC<{ result: { headers: string[], rows: string[][] } }> = ({ result }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
        <h4 className="font-semibold text-green-800 dark:text-green-300">Query Result</h4>
      </div>
      <div className="overflow-x-auto max-h-96">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {result.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {result.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                  >
                    {cell || <span className="text-gray-400 italic">NULL</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            SQL Practice Editor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Practice your SQL skills with our interactive editor. Write queries against sample data 
            and see results instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tables */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sample Tables
                </h2>
                <button
                  onClick={() => setShowTables(!showTables)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {showTables ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {showTables && (
                <div className="space-y-4">
                  {Object.values(sampleTables).map((table) => (
                    <Table key={table.name} data={table} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Editor and Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* SQL Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  SQL Query Editor
                </h3>
              </div>
              <div className="p-6">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-32 p-4 font-mono text-sm bg-gray-900 dark:bg-gray-950 text-green-400 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter your SQL query here..."
                />
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={handleRunQuery}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Run Query</span>
                  </button>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Press Ctrl+Enter to run
                  </div>
                </div>
              </div>
            </div>

            {/* Example Queries */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Example Queries
                </h3>
              </div>
              <div className="p-6">
                <div className="grid gap-2">
                  {exampleQueries.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(example)}
                      className="text-left p-3 text-sm font-mono bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200 rounded border border-gray-200 dark:border-gray-600 transition-colors duration-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="text-red-800 dark:text-red-300 font-medium">Error:</div>
                <div className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</div>
              </div>
            )}

            {result && (
              <ResultTable result={result} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;