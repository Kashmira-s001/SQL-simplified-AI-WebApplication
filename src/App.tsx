import React, { useState } from 'react';
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Lessons from './components/Lessons';
import Practice from './components/Practice';
import Quizzes from './components/Quizzes';
import Resources from './components/Resources';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage setCurrentPage={setCurrentPage} />;
      case 'lessons':
        return <Lessons />;
      case 'practice':
        return <Practice />;
      case 'quizzes':
        return <Quizzes />;
      case 'resources':
        return <Resources />;
      default:
        return <Homepage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <ProgressProvider>
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
          {renderCurrentPage()}
        </Layout>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;