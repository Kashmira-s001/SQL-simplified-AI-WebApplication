export interface TableData {
  name: string;
  headers: string[];
  rows: string[][];
}

export const sampleTables: Record<string, TableData> = {
  students: {
    name: 'students',
    headers: ['id', 'first_name', 'last_name', 'age', 'email'],
    rows: [
      ['1', 'John', 'Doe', '22', 'john.doe@email.com'],
      ['2', 'Jane', 'Smith', '19', 'jane.smith@email.com'],
      ['3', 'Mike', 'Johnson', '21', 'mike.johnson@email.com'],
      ['4', 'Sarah', 'Williams', '20', 'sarah.williams@email.com'],
      ['5', 'Tom', 'Brown', '23', 'tom.brown@email.com']
    ]
  },
  employees: {
    name: 'employees',
    headers: ['id', 'first_name', 'last_name', 'department', 'salary'],
    rows: [
      ['1', 'Alice', 'Johnson', 'Engineering', '85000'],
      ['2', 'Bob', 'Smith', 'Marketing', '65000'],
      ['3', 'Charlie', 'Brown', 'Engineering', '90000'],
      ['4', 'Diana', 'Davis', 'HR', '70000'],
      ['5', 'Eve', 'Wilson', 'Sales', '60000'],
      ['6', 'Frank', 'Miller', 'Engineering', '95000'],
      ['7', 'Grace', 'Taylor', 'Marketing', '68000'],
      ['8', 'Henry', 'Anderson', 'Sales', '62000']
    ]
  },
  orders: {
    name: 'orders',
    headers: ['id', 'customer_id', 'product_name', 'quantity', 'price'],
    rows: [
      ['1', '101', 'Laptop', '1', '1200.00'],
      ['2', '102', 'Mouse', '2', '25.50'],
      ['3', '101', 'Keyboard', '1', '75.00'],
      ['4', '103', 'Monitor', '1', '300.00'],
      ['5', '102', 'Headphones', '1', '150.00'],
      ['6', '104', 'Tablet', '1', '500.00'],
      ['7', '101', 'Webcam', '1', '120.00']
    ]
  }
};

export const queryResults: Record<string, { headers: string[], rows: string[][] }> = {
  'SELECT * FROM students;': {
    headers: sampleTables.students.headers,
    rows: sampleTables.students.rows
  },
  'SELECT first_name, last_name FROM students;': {
    headers: ['first_name', 'last_name'],
    rows: sampleTables.students.rows.map(row => [row[1], row[2]])
  },
  'SELECT * FROM students WHERE age > 20;': {
    headers: sampleTables.students.headers,
    rows: sampleTables.students.rows.filter(row => parseInt(row[3]) > 20)
  },
  'SELECT * FROM employees WHERE department = "Engineering";': {
    headers: sampleTables.employees.headers,
    rows: sampleTables.employees.rows.filter(row => row[3] === 'Engineering')
  },
  'SELECT department, COUNT(*) as count FROM employees GROUP BY department;': {
    headers: ['department', 'count'],
    rows: [
      ['Engineering', '3'],
      ['Marketing', '2'],
      ['HR', '1'],
      ['Sales', '2']
    ]
  },
  'SELECT * FROM orders ORDER BY price DESC;': {
    headers: sampleTables.orders.headers,
    rows: [...sampleTables.orders.rows].sort((a, b) => parseFloat(b[4]) - parseFloat(a[4]))
  }
};