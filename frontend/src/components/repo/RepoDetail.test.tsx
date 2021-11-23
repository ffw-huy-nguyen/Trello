import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import RepoDetail from './RepoDetail';
import user from '@testing-library/user-event';

global.confirm = jest.fn(() => true);
const item = {
  id: 'uuid-1111',
  name: 'Item 1'
};

const mockOnDeleted = jest.fn((data) => data);

describe('RepoDetail', () => {
  test('renders repo name and buttons', () => {
    render(<RepoDetail {...item} onDeleted={mockOnDeleted} />);
    const name = screen.getByTestId('repo-name');
    expect(name.textContent).toBe(item.name);

    const deleteBtn = screen.getByTestId('delete-btn');
    expect(deleteBtn).toBeInTheDocument();

    const updateBtn = screen.getByTestId('update-btn');
    expect(updateBtn).toBeInTheDocument();
  });

  test('renders editing form', async () => {
    render(<RepoDetail {...item} onDeleted={mockOnDeleted} />);

    const editingForm = screen.queryByTestId('editing-form');
    expect(editingForm).not.toBeInTheDocument();

    const updateBtn = screen.getByTestId('update-btn');
    user.click(updateBtn);
    await waitFor(() => {
      expect(screen.queryByTestId('editing-form')).toBeInTheDocument();
    });
  });

  test('deleting item', async () => {
    render(<RepoDetail {...item} onDeleted={mockOnDeleted} />);
    const deleteBtn = screen.getByTestId('delete-btn');
    user.click(deleteBtn);
    expect(global.confirm).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(mockOnDeleted).toHaveBeenCalledTimes(1);
    });
  });
});
