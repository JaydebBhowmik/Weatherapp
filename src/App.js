// ** import css
import React from 'react'
import './App.css';
import ErrorBoundary from './component/ErrorBoundary';

// ** import Components
import Header from './component/Header';
import SearchForm from './component/SearchForm';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Header/>
      </ErrorBoundary>

      <ErrorBoundary>
        <SearchForm/>
      </ErrorBoundary>
    </>
  );
}

export default App;
