import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import List from './List';
import { DragDropContext } from 'react-beautiful-dnd';

global.confirm = jest.fn(() => true);
const list = {
  title: 'Open',
  cards: [
    {
      text: 'Vulnerability 1',
      id: 'w'
    },
    {
      text: 'Vulnerability 2',
      id: 'x'
    }
  ],
  id: 'a'
};

const handleOnDragEnd = jest.fn();
describe('List', () => {
  beforeEach(() => {
    render(
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <List {...list} index={0} />
      </DragDropContext>
    );
  });

  test('renders list name', async () => {
    const name = screen.queryByTestId('list-name');
    expect(name?.innerText).toBe(list.title);
  });

  test('renders cards', () => {
    const listCard = screen.getByTestId('list-card');
    expect(listCard.childElementCount).toBe(list.cards.length);
  });

  test('renders creating form', async () => {
    const creatingForm = screen.queryByTestId('creating-form');
    expect(creatingForm).toBeInTheDocument();
  });
});
