import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import Card from './Card';
import user from '@testing-library/user-event';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

global.confirm = jest.fn(() => true);
const item = {
  id: 'uuid-1111',
  text: 'Item 1',
  index: 0
};

const mockOnDeleted = jest.fn((data) => data);
const handleOnDragEnd = jest.fn();
describe('Card detail', () => {
  beforeEach(() => {
    render(
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable key={0} droppableId={'1'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Card {...item} onDeleted={mockOnDeleted} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  });

  test('renders card name and buttons', () => {
    const name = screen.getByTestId('card-name');
    expect(name.textContent).toBe(item.text);

    const deleteBtn = screen.getByTestId('delete-btn');
    expect(deleteBtn).toBeInTheDocument();

    const updateBtn = screen.getByTestId('update-btn');
    expect(updateBtn).toBeInTheDocument();
  });

  test('renders editing form', async () => {
    const editingForm = screen.queryByTestId('editing-form');
    expect(editingForm).not.toBeInTheDocument();

    const updateBtn = screen.getByTestId('update-btn');
    user.click(updateBtn);
    await waitFor(() => {
      expect(screen.queryByTestId('editing-form')).toBeInTheDocument();
    });
  });

  test('deleting item', async () => {
    const deleteBtn = screen.getByTestId('delete-btn');
    user.click(deleteBtn);
    expect(global.confirm).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(mockOnDeleted).toHaveBeenCalledTimes(1);
    });
  });
});
