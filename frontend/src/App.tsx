import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './components/list/Board';
import Repo from './components/repo/Repo';
const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Repo />} />
        <Route path="/:id" element={<Board />} />
      </Routes>
    </Router>
  );
};

export default App;
