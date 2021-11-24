import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
const Board = lazy(() => import('./components/list/Board'));
const Repo = lazy(() => import('./components/repo/Repo'));
const App = (): JSX.Element => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Repo />} />
          <Route path="/:id" element={<Board />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
