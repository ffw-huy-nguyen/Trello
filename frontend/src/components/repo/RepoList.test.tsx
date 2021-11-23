import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import RepoList from './RepoList';

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
    render(<RepoList repos={[]} handleUpdateRepos={mockHandleUpdateRepos} />);
    expect(screen.queryByText('There is no repo.')).toBeInTheDocument();
  });

  test('renders repo list', () => {
    render(<RepoList repos={repos} handleUpdateRepos={mockHandleUpdateRepos} />);
    expect(screen.queryByText('There is no repo.')).not.toBeInTheDocument();

    const listRepo = screen.getByTestId('repo-list');
    expect(listRepo.childElementCount).toBe(repos.length);
  });
});
