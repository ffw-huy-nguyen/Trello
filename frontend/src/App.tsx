import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Repo from './components/repo/Repo';
const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Repo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
