import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Board from './components/list/Board';
import Repo from './components/repo/Repo';
const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Repo />} />
        <Route path="/:id" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
