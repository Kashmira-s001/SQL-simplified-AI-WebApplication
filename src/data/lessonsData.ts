export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  example: {
    query: string;
    output: string[][];
    headers: string[];
  };
}

export const lessonsData: Lesson[] = [
  // SQL Fundamentals (The Bedrock)
  {
    id: 'what-is-sql',
    title: 'What is SQL?',
    description: 'Understanding SQL and different database systems',
    category: 'SQL Fundamentals',
    difficulty: 'beginner',
    content: `SQL (Structured Query Language) is a standardized language for managing and manipulating relational databases. It's the universal language that allows you to communicate with databases.

Key Database Systems:
• MySQL: Open-source, widely used for web applications
• PostgreSQL: Advanced open-source database with rich features
• SQL Server: Microsoft's enterprise database solution
• Oracle: Enterprise-grade database for large organizations
• SQLite: Lightweight, file-based database

All these systems use SQL as their query language, with slight variations in syntax and features. Learning standard SQL gives you the foundation to work with any of these systems.

Why Learn SQL?
• Data is everywhere - SQL helps you access and analyze it
• High demand skill in tech, business, and data science
• Enables data-driven decision making
• Foundation for advanced data analysis and machine learning`,
    example: {
      query: '-- This is a SQL comment\nSELECT \'Hello, SQL World!\' as greeting;',
      headers: ['greeting'],
      output: [
        ['Hello, SQL World!']
      ]
    }
  },
  {
    id: 'data-types',
    title: 'SQL Data Types',
    description: 'Understanding different data types in SQL databases',
    category: 'SQL Fundamentals',
    difficulty: 'beginner',
    content: `Data types define what kind of data can be stored in each column. Choosing the right data type is crucial for database performance and data integrity.

Common SQL Data Types:

Numeric Types:
• INT / INTEGER: Whole numbers (-2,147,483,648 to 2,147,483,647)
• FLOAT / REAL: Decimal numbers with floating precision
• DECIMAL(p,s): Fixed-point numbers (p=precision, s=scale)
• BIGINT: Large integers

Text Types:
• VARCHAR(n): Variable-length strings up to n characters
• CHAR(n): Fixed-length strings of exactly n characters
• TEXT: Large text data (up to 65,535 characters)

Date & Time:
• DATE: Date values (YYYY-MM-DD)
• TIME: Time values (HH:MM:SS)
• DATETIME / TIMESTAMP: Date and time combined

Other Types:
• BOOLEAN: True/false values
• JSON: JSON formatted data (modern databases)
• BLOB: Binary large objects (images, files)`,
    example: {
      query: 'SELECT \n  42 as integer_example,\n  \'Hello\' as varchar_example,\n  3.14159 as float_example,\n  \'2024-01-15\' as date_example,\n  true as boolean_example;',
      headers: ['integer_example', 'varchar_example', 'float_example', 'date_example', 'boolean_example'],
      output: [
        ['42', 'Hello', '3.14159', '2024-01-15', 'true']
      ]
    }
  },
  {
    id: 'basic-select',
    title: 'Basic SELECT Queries',
    description: 'Learn to retrieve data with SELECT, FROM, and basic filtering',
    category: 'SQL Fundamentals',
    difficulty: 'beginner',
    content: `The SELECT statement is your primary tool for retrieving data from databases. It's like asking the database specific questions about your data.

Basic Syntax:
SELECT column1, column2, ...
FROM table_name;

Key Components:
• SELECT: Specifies which columns to retrieve
• FROM: Specifies which table to query
• * (asterisk): Selects all columns

Best Practices:
• Always specify column names instead of using * in production
• Use meaningful aliases for better readability
• Format your queries for readability with proper indentation

The SELECT statement is the foundation of all data retrieval in SQL. Master this, and you're on your way to becoming proficient in SQL.`,
    example: {
      query: 'SELECT first_name, last_name, email FROM students;',
      headers: ['first_name', 'last_name', 'email'],
      output: [
        ['John', 'Doe', 'john.doe@email.com'],
        ['Jane', 'Smith', 'jane.smith@email.com'],
        ['Mike', 'Johnson', 'mike.johnson@email.com'],
        ['Sarah', 'Williams', 'sarah.williams@email.com']
      ]
    }
  },
  {
    id: 'where-filtering',
    title: 'WHERE Clause & Filtering',
    description: 'Filter records using WHERE, BETWEEN, IN, LIKE, and IS NULL',
    category: 'SQL Fundamentals',
    difficulty: 'beginner',
    content: `The WHERE clause is your filter - it determines which rows are returned by your query. Think of it as setting conditions that rows must meet to be included in your results.

Basic WHERE Syntax:
SELECT columns FROM table WHERE condition;

Comparison Operators:
• = (equal to)
• <> or != (not equal to)
• > (greater than)
• < (less than)
• >= (greater than or equal)
• <= (less than or equal)

Advanced Filtering:
• BETWEEN: Range filtering
  WHERE age BETWEEN 18 AND 65

• IN: Match any value in a list
  WHERE department IN ('Sales', 'Marketing', 'HR')

• LIKE: Pattern matching with wildcards
  WHERE name LIKE 'John%' (starts with John)
  WHERE email LIKE '%@gmail.com' (ends with @gmail.com)

• IS NULL / IS NOT NULL: Check for missing values
  WHERE phone_number IS NOT NULL

Logical Operators:
• AND: Both conditions must be true
• OR: Either condition can be true
• NOT: Negates a condition`,
    example: {
      query: "SELECT * FROM students WHERE age > 20 AND email LIKE '%@email.com';",
      headers: ['id', 'first_name', 'last_name', 'age', 'email'],
      output: [
        ['1', 'John', 'Doe', '22', 'john.doe@email.com'],
        ['3', 'Mike', 'Johnson', '21', 'mike.johnson@email.com']
      ]
    }
  },
  {
    id: 'sorting-limiting',
    title: 'Sorting & Limiting Results',
    description: 'Order results with ORDER BY, remove duplicates with DISTINCT, and limit results',
    category: 'SQL Fundamentals',
    difficulty: 'beginner',
    content: `Controlling how your results are presented is crucial for data analysis and reporting.

ORDER BY - Sorting Results:
• ASC: Ascending order (default)
• DESC: Descending order
• Multiple columns: ORDER BY column1 ASC, column2 DESC

DISTINCT - Remove Duplicates:
SELECT DISTINCT column_name FROM table;
Useful when you want unique values only.

LIMIT - Control Result Size:
LIMIT n: Returns only the first n rows
LIMIT n OFFSET m: Skip m rows, then return n rows

Aliases with AS:
Give columns or tables temporary names for clarity:
SELECT first_name AS "First Name", 
       last_name AS "Last Name"
FROM students AS s;

Combining Everything:
SELECT DISTINCT department 
FROM employees 
WHERE salary > 50000 
ORDER BY department ASC 
LIMIT 10;

This query finds unique departments where employees earn over $50,000, sorts them alphabetically, and shows only the first 10 results.`,
    example: {
      query: 'SELECT DISTINCT department FROM employees ORDER BY department ASC LIMIT 3;',
      headers: ['department'],
      output: [
        ['Engineering'],
        ['HR'],
        ['Marketing']
      ]
    }
  },

  // Data Aggregation & Analysis
  {
    id: 'aggregate-functions',
    title: 'Aggregate Functions',
    description: 'Use COUNT, SUM, AVG, MIN, MAX to analyze data',
    category: 'Data Aggregation & Analysis',
    difficulty: 'intermediate',
    content: `Aggregate functions perform calculations on sets of rows and return a single result. They're essential for data analysis and reporting.

Core Aggregate Functions:

COUNT(): Counts rows
• COUNT(*): Counts all rows (including NULLs)
• COUNT(column): Counts non-NULL values in column
• COUNT(DISTINCT column): Counts unique non-NULL values

SUM(): Adds up numeric values
• SUM(salary): Total of all salaries
• Ignores NULL values

AVG(): Calculates average
• AVG(age): Average age
• Only works with numeric data

MIN() & MAX(): Find minimum and maximum values
• Works with numbers, dates, and text
• MIN(hire_date): Earliest hire date
• MAX(salary): Highest salary

Important Notes:
• Aggregate functions ignore NULL values (except COUNT(*))
• Cannot mix aggregate functions with regular columns without GROUP BY
• Use ROUND() to control decimal places: ROUND(AVG(salary), 2)

Real-world Applications:
• Financial reporting (total sales, average order value)
• Performance metrics (min/max response times)
• Data quality checks (count of missing values)`,
    example: {
      query: 'SELECT \n  COUNT(*) as total_employees,\n  AVG(salary) as avg_salary,\n  MIN(salary) as min_salary,\n  MAX(salary) as max_salary\nFROM employees;',
      headers: ['total_employees', 'avg_salary', 'min_salary', 'max_salary'],
      output: [
        ['8', '71250.00', '60000', '95000']
      ]
    }
  },
  {
    id: 'group-by-having',
    title: 'GROUP BY & HAVING',
    description: 'Group data and filter groups with HAVING clause',
    category: 'Data Aggregation & Analysis',
    difficulty: 'intermediate',
    content: `GROUP BY organizes rows into groups based on column values, allowing you to perform aggregate calculations for each group.

GROUP BY Syntax:
SELECT column, aggregate_function(column)
FROM table
GROUP BY column;

Key Concepts:
• Groups rows with the same values in specified columns
• Each group gets one row in the result
• Can group by multiple columns
• All non-aggregate columns in SELECT must be in GROUP BY

HAVING vs WHERE:
• WHERE: Filters rows BEFORE grouping
• HAVING: Filters groups AFTER grouping
• HAVING can use aggregate functions, WHERE cannot

Example Logic Flow:
1. FROM: Get data from table
2. WHERE: Filter individual rows
3. GROUP BY: Create groups
4. HAVING: Filter groups
5. SELECT: Choose columns to display
6. ORDER BY: Sort results

Common Patterns:
• Sales by region: GROUP BY region
• Average salary by department: GROUP BY department
• Count of orders by customer: GROUP BY customer_id

Advanced Grouping:
• GROUP BY ROLLUP: Adds subtotals and grand totals
• GROUP BY CUBE: All possible combinations of grouping`,
    example: {
      query: 'SELECT department, COUNT(*) as employee_count, AVG(salary) as avg_salary\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 1\nORDER BY avg_salary DESC;',
      headers: ['department', 'employee_count', 'avg_salary'],
      output: [
        ['Engineering', '3', '90000.00'],
        ['Sales', '2', '61000.00'],
        ['Marketing', '2', '66500.00']
      ]
    }
  },
  {
    id: 'subqueries',
    title: 'Subqueries (Nested SELECTs)',
    description: 'Use nested queries to solve complex problems step by step',
    category: 'Data Aggregation & Analysis',
    difficulty: 'intermediate',
    content: `Subqueries are queries nested inside other queries. They allow you to break complex problems into smaller, manageable pieces.

Types of Subqueries:

1. Scalar Subqueries (return single value):
SELECT name FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);

2. Row Subqueries (return single row):
SELECT * FROM products 
WHERE (category_id, price) = (SELECT category_id, MAX(price) FROM products WHERE category_id = 1);

3. Table Subqueries (return multiple rows):
SELECT * FROM employees 
WHERE department_id IN (SELECT id FROM departments WHERE location = 'New York');

Subquery Locations:
• WHERE clause: Most common usage
• FROM clause: Treat subquery result as a table
• SELECT clause: Calculate values for each row

Correlated vs Non-Correlated:
• Non-correlated: Inner query runs once, independent of outer query
• Correlated: Inner query references outer query, runs for each outer row

Performance Considerations:
• Subqueries can be slower than JOINs
• Modern databases often optimize subqueries automatically
• Consider JOINs for better performance with large datasets

Best Practices:
• Use meaningful aliases for readability
• Consider CTEs (WITH clause) for complex nested queries
• Test performance with large datasets`,
    example: {
      query: 'SELECT first_name, last_name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees)\nORDER BY salary DESC;',
      headers: ['first_name', 'last_name', 'salary'],
      output: [
        ['Frank', 'Miller', '95000'],
        ['Charlie', 'Brown', '90000'],
        ['Alice', 'Johnson', '85000']
      ]
    }
  },
  {
    id: 'window-functions',
    title: 'Window Functions',
    description: 'Advanced analytics with ROW_NUMBER, RANK, LEAD, LAG, and running totals',
    category: 'Data Aggregation & Analysis',
    difficulty: 'advanced',
    content: `Window functions perform calculations across a set of rows related to the current row, without collapsing the result set like GROUP BY does.

Basic Syntax:
function_name() OVER (
  [PARTITION BY column]
  [ORDER BY column]
  [ROWS/RANGE frame_specification]
)

Ranking Functions:
• ROW_NUMBER(): Unique sequential numbers (1, 2, 3, 4...)
• RANK(): Ranking with gaps for ties (1, 2, 2, 4...)
• DENSE_RANK(): Ranking without gaps (1, 2, 2, 3...)

Offset Functions:
• LEAD(column, n): Value from n rows ahead
• LAG(column, n): Value from n rows behind
• FIRST_VALUE(): First value in window
• LAST_VALUE(): Last value in window

Aggregate Window Functions:
• SUM() OVER(): Running totals
• AVG() OVER(): Moving averages
• COUNT() OVER(): Running counts

Frame Specifications:
• ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW: From start to current
• ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING: 5-row sliding window
• RANGE BETWEEN INTERVAL '1' MONTH PRECEDING AND CURRENT ROW: Time-based windows

Real-world Applications:
• Sales rankings and performance comparisons
• Running totals and moving averages for trends
• Year-over-year growth calculations
• Top N analysis within groups`,
    example: {
      query: 'SELECT \n  first_name,\n  department,\n  salary,\n  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,\n  LAG(salary) OVER (ORDER BY salary) as prev_salary\nFROM employees\nORDER BY department, salary DESC;',
      headers: ['first_name', 'department', 'salary', 'dept_rank', 'prev_salary'],
      output: [
        ['Frank', 'Engineering', '95000', '1', '90000'],
        ['Charlie', 'Engineering', '90000', '2', '85000'],
        ['Alice', 'Engineering', '85000', '3', '70000'],
        ['Diana', 'HR', '70000', '1', '68000']
      ]
    }
  },

  // Joins (Relational Power)
  {
    id: 'inner-join',
    title: 'INNER JOIN',
    description: 'Combine data from multiple tables using INNER JOIN',
    category: 'Joins (Relational Power)',
    difficulty: 'intermediate',
    content: `INNER JOIN combines rows from two or more tables based on a related column. It only returns rows where there's a match in both tables.

Basic Syntax:
SELECT columns
FROM table1
INNER JOIN table2 ON table1.column = table2.column;

How INNER JOIN Works:
1. Takes each row from the first table
2. Looks for matching rows in the second table
3. Combines matching rows into a single result row
4. Excludes rows that don't have matches

Key Points:
• Only returns rows with matches in BOTH tables
• Most restrictive type of join
• Most commonly used join type
• Can join multiple tables in one query

Multiple Table Joins:
SELECT columns
FROM table1
INNER JOIN table2 ON table1.id = table2.table1_id
INNER JOIN table3 ON table2.id = table3.table2_id;

Join Conditions:
• Usually based on foreign key relationships
• Can use multiple conditions with AND/OR
• Can join on different column names using aliases

Performance Tips:
• Ensure join columns are indexed
• Join on the most selective conditions first
• Use table aliases for readability`,
    example: {
      query: 'SELECT s.first_name, s.last_name, c.course_name\nFROM students s\nINNER JOIN enrollments e ON s.id = e.student_id\nINNER JOIN courses c ON e.course_id = c.id;',
      headers: ['first_name', 'last_name', 'course_name'],
      output: [
        ['John', 'Doe', 'Database Systems'],
        ['John', 'Doe', 'Web Development'],
        ['Jane', 'Smith', 'Data Science'],
        ['Mike', 'Johnson', 'Database Systems']
      ]
    }
  },
  {
    id: 'outer-joins',
    title: 'LEFT, RIGHT & FULL OUTER JOINs',
    description: 'Include unmatched rows with LEFT, RIGHT, and FULL OUTER JOINs',
    category: 'Joins (Relational Power)',
    difficulty: 'intermediate',
    content: `Outer joins include rows even when there's no match in one of the tables, filling missing values with NULL.

LEFT JOIN (LEFT OUTER JOIN):
• Returns ALL rows from the left table
• Returns matching rows from the right table
• NULL values for unmatched right table columns

RIGHT JOIN (RIGHT OUTER JOIN):
• Returns ALL rows from the right table
• Returns matching rows from the left table
• NULL values for unmatched left table columns

FULL OUTER JOIN:
• Returns ALL rows from both tables
• NULL values where there's no match
• Not supported by all databases (MySQL doesn't support it)

When to Use Each:
• LEFT JOIN: "Show me all customers and their orders (if any)"
• RIGHT JOIN: Rarely used, can be rewritten as LEFT JOIN
• FULL OUTER JOIN: "Show me all customers and all orders, matched where possible"

Common Patterns:
• Find records without matches: WHERE right_table.id IS NULL
• Data quality checks: Find orphaned records
• Reporting: Include all categories even with zero sales

NULL Handling:
• Use COALESCE() or ISNULL() to replace NULLs
• Be careful with WHERE conditions on nullable columns
• COUNT() ignores NULLs, COUNT(*) includes them`,
    example: {
      query: 'SELECT s.first_name, s.last_name, c.course_name\nFROM students s\nLEFT JOIN enrollments e ON s.id = e.student_id\nLEFT JOIN courses c ON e.course_id = c.id\nORDER BY s.last_name;',
      headers: ['first_name', 'last_name', 'course_name'],
      output: [
        ['John', 'Doe', 'Database Systems'],
        ['John', 'Doe', 'Web Development'],
        ['Mike', 'Johnson', 'Database Systems'],
        ['Jane', 'Smith', 'Data Science'],
        ['Sarah', 'Williams', null]
      ]
    }
  },
  {
    id: 'self-cross-joins',
    title: 'SELF JOIN & CROSS JOIN',
    description: 'Advanced join techniques: joining a table to itself and Cartesian products',
    category: 'Joins (Relational Power)',
    difficulty: 'advanced',
    content: `SELF JOIN and CROSS JOIN are specialized join types for specific use cases.

SELF JOIN:
A table joined with itself, useful for hierarchical data or comparing rows within the same table.

Common Use Cases:
• Employee-Manager relationships
• Finding pairs or combinations within data
• Comparing current vs previous records
• Hierarchical data (categories, organizational charts)

Syntax:
SELECT a.column, b.column
FROM table a
JOIN table b ON a.some_column = b.other_column;

CROSS JOIN:
Creates a Cartesian product - every row from the first table combined with every row from the second table.

Characteristics:
• No ON condition needed
• Result size = table1_rows × table2_rows
• Can create very large result sets quickly
• Rarely used in practice

Use Cases:
• Generating all possible combinations
• Creating test data
• Mathematical operations requiring all pairs

Performance Considerations:
• SELF JOINs can be expensive on large tables
• CROSS JOINs can create massive result sets
• Always use appropriate WHERE clauses to limit results
• Consider indexing on join columns

Best Practices:
• Use meaningful table aliases (emp, mgr instead of a, b)
• Add WHERE clauses to prevent runaway queries
• Test with small datasets first`,
    example: {
      query: 'SELECT \n  emp.first_name as employee_name,\n  mgr.first_name as manager_name\nFROM employees emp\nINNER JOIN employees mgr ON emp.manager_id = mgr.id\nWHERE emp.manager_id IS NOT NULL;',
      headers: ['employee_name', 'manager_name'],
      output: [
        ['Bob', 'Alice'],
        ['Charlie', 'Alice'],
        ['Eve', 'Diana'],
        ['Henry', 'Diana']
      ]
    }
  },

  // Data Modification (CRUD in SQL)
  {
    id: 'insert-data',
    title: 'INSERT INTO - Adding Data',
    description: 'Learn to add new records to database tables',
    category: 'Data Modification (CRUD)',
    difficulty: 'intermediate',
    content: `INSERT INTO adds new rows to a table. It's the "Create" in CRUD operations.

Basic Syntax:
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);

Insert Methods:

1. Single Row Insert:
INSERT INTO students (first_name, last_name, age)
VALUES ('John', 'Doe', 25);

2. Multiple Rows Insert:
INSERT INTO students (first_name, last_name, age)
VALUES 
  ('Jane', 'Smith', 23),
  ('Mike', 'Johnson', 27),
  ('Sarah', 'Williams', 24);

3. Insert from SELECT (Copy data):
INSERT INTO archived_orders
SELECT * FROM orders WHERE order_date < '2023-01-01';

4. Insert with Default Values:
INSERT INTO products (name) VALUES ('New Product');
-- Other columns get default values or NULL

Important Considerations:
• Column order must match value order
• Can omit columns with default values or NULL allowed
• Auto-increment columns (ID) are usually omitted
• String values need quotes, numbers don't

Data Integrity:
• Primary key constraints prevent duplicates
• Foreign key constraints ensure referential integrity
• Check constraints validate data rules
• NOT NULL constraints prevent missing required data

Best Practices:
• Always specify column names for clarity
• Use transactions for multiple related inserts
• Validate data before inserting
• Handle errors gracefully in applications`,
    example: {
      query: 'INSERT INTO students (first_name, last_name, age, email)\nVALUES \n  (\'Alex\', \'Brown\', 22, \'alex.brown@email.com\'),\n  (\'Lisa\', \'Davis\', 24, \'lisa.davis@email.com\');\n\n-- Show the inserted data\nSELECT * FROM students WHERE first_name IN (\'Alex\', \'Lisa\');',
      headers: ['id', 'first_name', 'last_name', 'age', 'email'],
      output: [
        ['6', 'Alex', 'Brown', '22', 'alex.brown@email.com'],
        ['7', 'Lisa', 'Davis', '24', 'lisa.davis@email.com']
      ]
    }
  },
  {
    id: 'update-delete',
    title: 'UPDATE & DELETE - Modifying Data',
    description: 'Modify existing records and remove unwanted data safely',
    category: 'Data Modification (CRUD)',
    difficulty: 'intermediate',
    content: `UPDATE modifies existing rows, while DELETE removes rows from tables. Both operations require careful use to avoid data loss.

UPDATE Syntax:
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

UPDATE Examples:
-- Update single column
UPDATE employees SET salary = 75000 WHERE id = 1;

-- Update multiple columns
UPDATE employees 
SET salary = salary * 1.1, last_updated = NOW()
WHERE department = 'Engineering';

-- Update with calculations
UPDATE products 
SET price = price * 0.9 
WHERE category = 'Electronics' AND stock > 100;

DELETE Syntax:
DELETE FROM table_name WHERE condition;

DELETE Examples:
-- Delete specific rows
DELETE FROM orders WHERE order_date < '2022-01-01';

-- Delete with joins (some databases)
DELETE o FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE c.status = 'inactive';

CRITICAL SAFETY RULES:
• ALWAYS use WHERE clause (unless you want to affect all rows)
• Test with SELECT first: SELECT * FROM table WHERE condition;
• Use transactions for important operations
• Backup data before major modifications
• Consider soft deletes (status flags) instead of hard deletes

Common Mistakes:
• Forgetting WHERE clause (affects all rows!)
• Using wrong conditions
• Not considering foreign key constraints
• Updating/deleting in wrong order with related data`,
    example: {
      query: '-- Update salary for Engineering department\nUPDATE employees \nSET salary = salary * 1.05 \nWHERE department = \'Engineering\';\n\n-- Show updated salaries\nSELECT first_name, last_name, department, salary \nFROM employees \nWHERE department = \'Engineering\';',
      headers: ['first_name', 'last_name', 'department', 'salary'],
      output: [
        ['Alice', 'Johnson', 'Engineering', '89250'],
        ['Charlie', 'Brown', 'Engineering', '94500'],
        ['Frank', 'Miller', 'Engineering', '99750']
      ]
    }
  },
  {
    id: 'transactions-constraints',
    title: 'Transactions & Constraints',
    description: 'Ensure data integrity with transactions and database constraints',
    category: 'Data Modification (CRUD)',
    difficulty: 'advanced',
    content: `Transactions ensure data consistency by grouping operations that must succeed or fail together. Constraints enforce data integrity rules.

TRANSACTIONS (ACID Properties):
• Atomicity: All operations succeed or all fail
• Consistency: Database remains in valid state
• Isolation: Concurrent transactions don't interfere
• Durability: Committed changes are permanent

Transaction Syntax:
BEGIN; -- Start transaction
  INSERT INTO orders (customer_id, total) VALUES (1, 100.00);
  UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 1;
COMMIT; -- Save changes

-- Or if something goes wrong:
ROLLBACK; -- Undo all changes

CONSTRAINTS (Data Integrity):

1. PRIMARY KEY:
   • Uniquely identifies each row
   • Cannot be NULL
   • Only one per table

2. FOREIGN KEY:
   • Links to primary key in another table
   • Ensures referential integrity
   • Prevents orphaned records

3. UNIQUE:
   • Ensures column values are unique
   • Can have multiple per table
   • NULL values allowed (usually)

4. CHECK:
   • Custom validation rules
   • CHECK (age >= 18)
   • CHECK (price > 0)

5. NOT NULL:
   • Prevents empty values
   • Required for critical data

Constraint Examples:
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  total DECIMAL(10,2) CHECK (total > 0),
  email VARCHAR(255) UNIQUE,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

Best Practices:
• Use transactions for related operations
• Keep transactions short to avoid locks
• Handle transaction errors in application code
• Design constraints to match business rules`,
    example: {
      query: '-- Transaction example\nBEGIN;\n  INSERT INTO orders (customer_id, product_name, quantity, price) \n  VALUES (101, \'Laptop\', 1, 1200.00);\n  \n  UPDATE customers \n  SET total_orders = total_orders + 1 \n  WHERE id = 101;\nCOMMIT;\n\n-- Show the result\nSELECT * FROM orders WHERE customer_id = 101 ORDER BY id DESC LIMIT 1;',
      headers: ['id', 'customer_id', 'product_name', 'quantity', 'price'],
      output: [
        ['8', '101', 'Laptop', '1', '1200.00']
      ]
    }
  },

  // Database Design & Normalization
  {
    id: 'normalization',
    title: 'Database Normalization (1NF to BCNF)',
    description: 'Design efficient databases by eliminating redundancy and anomalies',
    category: 'Database Design & Normalization',
    difficulty: 'advanced',
    content: `Normalization is the process of organizing data to reduce redundancy and improve data integrity. It involves decomposing tables into smaller, related tables.

NORMAL FORMS:

1st Normal Form (1NF):
• Each column contains atomic (indivisible) values
• No repeating groups or arrays
• Each row is unique

Before 1NF: phone_numbers = "123-456-7890, 987-654-3210"
After 1NF: Separate rows for each phone number

2nd Normal Form (2NF):
• Must be in 1NF
• No partial dependencies on composite primary keys
• Non-key columns depend on the entire primary key

3rd Normal Form (3NF):
• Must be in 2NF
• No transitive dependencies
• Non-key columns depend only on primary key, not on other non-key columns

Boyce-Codd Normal Form (BCNF):
• Stricter version of 3NF
• Every determinant is a candidate key
• Eliminates all redundancy based on functional dependencies

NORMALIZATION BENEFITS:
• Eliminates data redundancy
• Prevents update anomalies
• Reduces storage space
• Improves data consistency
• Easier maintenance

DENORMALIZATION:
Sometimes we intentionally break normalization rules for:
• Performance optimization
• Simplified queries
• Data warehousing
• Reporting requirements

DESIGN PROCESS:
1. Identify entities and relationships
2. Create initial table structure
3. Apply normalization rules
4. Consider performance implications
5. Document design decisions`,
    example: {
      query: '-- Example of normalized design\n-- Instead of one table with redundant data:\n-- CREATE TABLE orders_denormalized (\n--   order_id, customer_name, customer_email, \n--   product_name, product_price, quantity\n-- );\n\n-- We use normalized tables:\nSELECT \n  o.id as order_id,\n  c.name as customer_name,\n  p.name as product_name,\n  oi.quantity,\n  p.price\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id;',
      headers: ['order_id', 'customer_name', 'product_name', 'quantity', 'price'],
      output: [
        ['1', 'John Smith', 'Laptop', '1', '1200.00'],
        ['2', 'Jane Doe', 'Mouse', '2', '25.50'],
        ['3', 'John Smith', 'Keyboard', '1', '75.00']
      ]
    }
  },

  // Advanced SQL Concepts
  {
    id: 'views-ctes',
    title: 'Views & Common Table Expressions (CTEs)',
    description: 'Create virtual tables with Views and simplify complex queries with CTEs',
    category: 'Advanced SQL Concepts',
    difficulty: 'advanced',
    content: `Views and CTEs help organize and simplify complex queries by creating reusable, named query components.

VIEWS (Virtual Tables):
Views are stored queries that appear as tables. They don't store data but provide a way to simplify complex queries.

Creating Views:
CREATE VIEW employee_summary AS
SELECT 
  department,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary,
  MAX(salary) as max_salary
FROM employees
GROUP BY department;

-- Using the view
SELECT * FROM employee_summary WHERE avg_salary > 70000;

View Benefits:
• Simplify complex queries
• Provide data security (hide sensitive columns)
• Create consistent interfaces
• Encapsulate business logic

COMMON TABLE EXPRESSIONS (CTEs):
CTEs are temporary named result sets that exist only during query execution.

Basic CTE Syntax:
WITH cte_name AS (
  SELECT columns FROM table WHERE condition
)
SELECT * FROM cte_name;

Multiple CTEs:
WITH 
high_earners AS (
  SELECT * FROM employees WHERE salary > 80000
),
dept_stats AS (
  SELECT department, COUNT(*) as count FROM high_earners GROUP BY department
)
SELECT * FROM dept_stats;

RECURSIVE CTEs:
Handle hierarchical data like organizational charts or category trees.

WITH RECURSIVE employee_hierarchy AS (
  -- Base case: top-level managers
  SELECT id, name, manager_id, 1 as level
  FROM employees WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive case: employees with managers
  SELECT e.id, e.name, e.manager_id, eh.level + 1
  FROM employees e
  JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy;

When to Use:
• Views: Reusable logic, security, simplification
• CTEs: Complex queries, readability, recursive operations`,
    example: {
      query: '-- CTE example: Find departments with above-average salaries\nWITH dept_avg AS (\n  SELECT \n    department,\n    AVG(salary) as avg_dept_salary\n  FROM employees\n  GROUP BY department\n),\noverall_avg AS (\n  SELECT AVG(salary) as company_avg\n  FROM employees\n)\nSELECT \n  da.department,\n  da.avg_dept_salary,\n  oa.company_avg\nFROM dept_avg da\nCROSS JOIN overall_avg oa\nWHERE da.avg_dept_salary > oa.company_avg;',
      headers: ['department', 'avg_dept_salary', 'company_avg'],
      output: [
        ['Engineering', '90000.00', '71250.00']
      ]
    }
  },
  {
    id: 'performance-optimization',
    title: 'Indexes & Query Optimization',
    description: 'Improve query performance with indexes and optimization techniques',
    category: 'Advanced SQL Concepts',
    difficulty: 'advanced',
    content: `Database performance optimization involves understanding how queries execute and using indexes strategically to speed up data retrieval.

INDEXES:
Indexes are data structures that improve query performance by creating shortcuts to data.

Types of Indexes:

1. B-Tree Index (Most Common):
   • Good for equality and range queries
   • Maintains sorted order
   • Default index type in most databases

2. Hash Index:
   • Excellent for equality lookups
   • Not suitable for range queries
   • Very fast for exact matches

3. Bitmap Index:
   • Good for low-cardinality data
   • Efficient for complex WHERE clauses
   • Common in data warehouses

Creating Indexes:
-- Single column index
CREATE INDEX idx_employee_department ON employees(department);

-- Composite index
CREATE INDEX idx_employee_dept_salary ON employees(department, salary);

-- Unique index
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

QUERY OPTIMIZATION TECHNIQUES:

1. Use EXPLAIN/EXPLAIN ANALYZE:
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';
-- Shows query execution plan and costs

2. Index Best Practices:
• Index frequently queried columns
• Index foreign key columns
• Don't over-index (slows INSERT/UPDATE)
• Consider composite indexes for multi-column queries

3. Query Writing Tips:
• Use specific columns instead of SELECT *
• Use appropriate WHERE clauses
• Avoid functions in WHERE clauses
• Use EXISTS instead of IN for subqueries
• Consider JOINs instead of subqueries

4. Performance Monitoring:
• Monitor slow query logs
• Analyze query execution plans
• Track index usage statistics
• Regular database maintenance (ANALYZE, VACUUM)

OPTIMIZATION EXAMPLE:
-- Slow query
SELECT * FROM orders WHERE YEAR(order_date) = 2024;

-- Optimized query
SELECT * FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';`,
    example: {
      query: '-- Query optimization example\n-- This query benefits from an index on (department, salary)\nEXPLAIN SELECT first_name, last_name, salary\nFROM employees \nWHERE department = \'Engineering\' \n  AND salary > 85000\nORDER BY salary DESC;\n\n-- Actual optimized query result:\nSELECT first_name, last_name, salary\nFROM employees \nWHERE department = \'Engineering\' \n  AND salary > 85000\nORDER BY salary DESC;',
      headers: ['first_name', 'last_name', 'salary'],
      output: [
        ['Frank', 'Miller', '95000'],
        ['Charlie', 'Brown', '90000']
      ]
    }
  }
];

export const lessonCategories = [
  'SQL Fundamentals',
  'Data Aggregation & Analysis', 
  'Joins (Relational Power)',
  'Data Modification (CRUD)',
  'Database Design & Normalization',
  'Advanced SQL Concepts'
];