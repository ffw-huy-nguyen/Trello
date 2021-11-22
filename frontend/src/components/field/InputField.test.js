import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import InputField from './InputField';

global.alert = jest.fn();

const item = {
  id: 1,
  name: 'Item 1'
};

const mockApi = {
  createItem: jest.fn((item) => {
    return new Promise((resolve) => {
      resolve({
        ...item,
        id: 1
      });
    });
  }),
  updateItem: jest.fn((id, item) => {
    return new Promise((resolve) => {
      resolve({
        ...item,
        id
      });
    });
  })
};

const mockOnCreated = jest.fn((data) => data);
const mockOnUpdated = jest.fn((data) => data);

describe('InputField', () => {
  test('renders field for creating new item', () => {
    render(<InputField id="0" name="" inputName="Test Input" api={null} />);
    const input = screen.getByTestId('input-field');
    expect(input.value).toBe('');

    const saveButton = screen.getByTestId('save-button');
    expect(saveButton).toBeInTheDocument();

    const cancelButton = screen.queryByTestId('cancel-button');
    expect(cancelButton).not.toBeInTheDocument();
  });

  test('renders field for updating item', () => {
    render(<InputField {...item} editing={true} inputName="Test Input" api={null} />);

    const input = screen.getByTestId('input-field');
    expect(input.value).toBe(item.name);

    const saveButton = screen.getByTestId('save-button');
    expect(saveButton).toBeInTheDocument();

    const cancelButton = screen.getByTestId('cancel-button');
    expect(cancelButton).toBeInTheDocument();
  });
});

describe('Create new item', () => {
  test('submit without enter name', () => {
    render(<InputField id="0" name="" inputName="Test Input" api={null} />);
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('submit with correct name', async () => {
    render(
      <InputField id="" name="" onCreated={mockOnCreated} inputName="Test Input" api={mockApi} />
    );

    let input = screen.getByTestId('input-field');
    fireEvent.change(input, {
      target: {
        value: item.name
      }
    });

    expect(input.value).toBe(item.name);

    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);

    expect(await mockApi.createItem).toHaveBeenCalledTimes(1);
    expect(mockOnCreated).toHaveBeenCalledWith({ id: 1, name: item.name });

    input = screen.getByTestId('input-field');
    expect(input.value).toBe('');
  });
});

describe('Update existing item', () => {
  test('submit without enter name', () => {
    render(<InputField {...item} inputName="Test Input" api={null} />);
    let input = screen.getByTestId('input-field');
    fireEvent.change(input, {
      target: {
        value: ''
      }
    });
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    expect(global.alert).toHaveBeenCalledTimes(2);
  });

  test('submit with correct name', async () => {
    render(<InputField {...item} onUpdated={mockOnUpdated} inputName="Test Input" api={mockApi} />);

    let input = screen.getByTestId('input-field');
    const updatedName = 'New name';
    fireEvent.change(input, {
      target: {
        value: updatedName
      }
    });

    expect(input.value).toBe(updatedName);

    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);

    expect(await mockApi.createItem).toHaveBeenCalledTimes(1);
    expect(mockOnUpdated).toHaveBeenCalledWith(updatedName);
  });
});
