export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizzesData: Quiz[] = [
  {
    id: 'sql-basics',
    title: 'SQL Basics Quiz',
    description: 'Test your knowledge of basic SQL concepts',
    questions: [
      {
        id: 'q1',
        question: 'Which SQL keyword is used to retrieve data from a database?',
        options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
        correctAnswer: 1,
        explanation: 'SELECT is the primary keyword used to retrieve data from database tables.'
      },
      {
        id: 'q2',
        question: 'Which clause is used to filter records in SQL?',
        options: ['FILTER', 'WHERE', 'IF', 'CONDITION'],
        correctAnswer: 1,
        explanation: 'The WHERE clause is used to filter records and extract only those records that fulfill a specified condition.'
      },
      {
        id: 'q3',
        question: 'Which keyword is used to sort the result-set?',
        options: ['SORT', 'ORDER BY', 'ARRANGE', 'ORGANIZE'],
        correctAnswer: 1,
        explanation: 'ORDER BY is used to sort the result-set in ascending or descending order.'
      },
      {
        id: 'q4',
        question: 'What does the * symbol represent in a SELECT statement?',
        options: ['Multiplication', 'All columns', 'Primary key', 'Index'],
        correctAnswer: 1,
        explanation: 'The * symbol is a wildcard that represents all columns in the table.'
      },
      {
        id: 'q5',
        question: 'Which operator is used for pattern matching in SQL?',
        options: ['MATCH', 'PATTERN', 'LIKE', 'SIMILAR'],
        correctAnswer: 2,
        explanation: 'LIKE is used for pattern matching, often with wildcards like % and _.'
      }
    ]
  },
  {
    id: 'joins-aggregates',
    title: 'JOINs and Aggregates Quiz',
    description: 'Test your knowledge of JOINs and aggregate functions',
    questions: [
      {
        id: 'q1',
        question: 'Which JOIN returns all records from the left table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
        correctAnswer: 1,
        explanation: 'LEFT JOIN returns all records from the left table and matching records from the right table.'
      },
      {
        id: 'q2',
        question: 'Which aggregate function counts the number of rows?',
        options: ['SUM()', 'COUNT()', 'AVG()', 'TOTAL()'],
        correctAnswer: 1,
        explanation: 'COUNT() returns the number of rows that match the specified criteria.'
      },
      {
        id: 'q3',
        question: 'What is the purpose of GROUP BY?',
        options: ['Sort data', 'Filter data', 'Group rows with same values', 'Join tables'],
        correctAnswer: 2,
        explanation: 'GROUP BY groups rows that have the same values into summary rows, often used with aggregate functions.'
      },
      {
        id: 'q4',
        question: 'Which JOIN shows only matching records from both tables?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'OUTER JOIN'],
        correctAnswer: 0,
        explanation: 'INNER JOIN returns only records that have matching values in both tables.'
      },
      {
        id: 'q5',
        question: 'Which function calculates the average of numeric values?',
        options: ['MEAN()', 'AVERAGE()', 'AVG()', 'CALC()'],
        correctAnswer: 2,
        explanation: 'AVG() calculates the average value of a numeric column.'
      }
    ]
  }
];