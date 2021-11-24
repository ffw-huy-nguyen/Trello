import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import RepoList from './RepoList';
import { HashRouter as Router } from 'react-router-dom';

global.confirm = jest.fn(() => true);
const repos = [
  {
    id: 'uuid-1111',
    name: 'Item 1'
  }
];

const mockHandleUpdateRepos = jest.fn((data) => data);

describe('RepoList', () => {
  test('renders blank if no repo', () => {
    render(
      <Router>
        <RepoList repos={[]} handleUpdateRepos={mockHandleUpdateRepos} />
      </Router>
    );
    expect(screen.queryByText('There is no repo.')).toBeInTheDocument();
  });

  test('renders repo list', () => {
    render(
      <Router>
        <RepoList repos={repos} handleUpdateRepos={mockHandleUpdateRepos} />
      </Router>
    );
    expect(screen.queryByText('There is no repo.')).not.toBeInTheDocument();

    const listRepo = screen.getByTestId('repo-list');
    expect(listRepo.childElementCount).toBe(repos.length);
  });
});
