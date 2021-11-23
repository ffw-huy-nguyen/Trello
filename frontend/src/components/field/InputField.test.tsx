import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import InputField from './InputField';
import BaseApi from '../../api/Base';

global.alert = jest.fn();

const item = {
  id: 'uuid-1111',
  name: 'Item 1'
};

jest.mock('../../api/Base');
const mockApi = new BaseApi('test');

const mockOnCreated = jest.fn((data) => data);
const mockOnUpdated = jest.fn((data) => data);
const mockOnCanceled = jest.fn();

describe('InputField', () => {
  test('renders field for creating new item', () => {
    render(<InputField id="0" name="" inputName="Test Input" api={mockApi} />);
    const input = screen.getByTestId('input-field');
    expect((input as HTMLInputElement).value).toBe('');

    const saveButton = screen.getByTestId('save-button');
    expect(saveButton).toBeInTheDocument();

    const cancelButton = screen.queryByTestId('cancel-button');
    expect(cancelButton).not.toBeInTheDocument();
  });

  test('renders field for updating item', () => {
    render(<InputField {...item} editing={true} inputName="Test Input" api={mockApi} />);

    const input = screen.getByTestId('input-field');
    expect((input as HTMLInputElement).value).toBe(item.name);

    const saveButton = screen.getByTestId('save-button');
    expect(saveButton).toBeInTheDocument();

    const cancelButton = screen.getByTestId('cancel-button');
    expect(cancelButton).toBeInTheDocument();
  });
});

describe('Create new item', () => {
  test('submit without enter name', () => {
    render(<InputField id="0" name="" inputName="Test Input" api={mockApi} />);
    const saveButton = screen.getByTestId('save-button');
    user.click(saveButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  test('submit with correct name', async () => {
    render(
      <InputField id="" name="" onCreated={mockOnCreated} inputName="Test Input" api={mockApi} />
    );
    const input = screen.getByTestId('input-field');
    fireEvent.change(input, {
      target: {
        value: item.name
      }
    });

    expect((input as HTMLInputElement).value).toBe(item.name);
    const saveButton = screen.getByTestId('save-button');

    user.click(saveButton);

    await waitFor(() => expect(mockApi.createItem).toHaveBeenCalledTimes(1));
    expect(mockOnCreated).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe('');
  });
});

describe('Update existing item', () => {
  test('submit without enter name', () => {
    render(<InputField {...item} editing={true} inputName="Test Input" api={mockApi} />);
    const input = screen.getByTestId('input-field');
    fireEvent.change(input, {
      target: {
        value: ''
      }
    });
    const saveButton = screen.getByTestId('save-button');
    user.click(saveButton);
    expect(global.alert).toHaveBeenCalledTimes(2);
  });

  test('submit with correct name', async () => {
    render(
      <InputField
        {...item}
        editing={true}
        onUpdated={mockOnUpdated}
        inputName="Test Input"
        api={mockApi}
      />
    );

    const input = screen.getByTestId('input-field');
    const updatedName = 'New name';
    fireEvent.change(input, {
      target: {
        value: updatedName
      }
    });

    expect((input as HTMLInputElement).value).toBe(updatedName);

    const saveButton = screen.getByTestId('save-button');
    user.click(saveButton);
    await waitFor(() => expect(mockApi.createItem).toHaveBeenCalledTimes(1));
    expect(mockOnUpdated).toHaveBeenCalledTimes(1);
  });

  test('cancel button', () => {
    render(
      <InputField
        {...item}
        editing={true}
        onCanceled={mockOnCanceled}
        inputName="Test Input"
        api={mockApi}
      />
    );
    const saveButton = screen.getByTestId('cancel-button');
    user.click(saveButton);
    expect(mockOnCanceled).toHaveBeenCalledTimes(1);
  });
});
