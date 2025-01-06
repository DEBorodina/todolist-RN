import React from 'react';

import { addFirestoreCategory } from '@firestore';
import { fireEvent, render, waitFor } from '@test-utils';

import { AddCategoryForm } from '../AddCategoryForm';

global.Math.random = jest.fn(() => 0.5);

jest.mock('@firestore', () => ({
  addFirestoreCategory: jest.fn(() => 'newCategoryId'),
}));

describe('AddCategoryForm', () => {
  it('should render the form elements correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddCategoryForm />);

    expect(getByPlaceholderText('Category')).toBeTruthy();
    expect(getByText('Add category')).toBeTruthy();
    expect(getByPlaceholderText('Icon')).toBeTruthy();
  });

  it('should allow user to type category name and select an icon', async () => {
    const { getByPlaceholderText, getByText } = render(<AddCategoryForm />);

    const categoryInput = getByPlaceholderText('Category');
    fireEvent.changeText(categoryInput, 'New Category');
    expect(categoryInput.props.value).toBe('New Category');

    const iconSelect = getByPlaceholderText('Icon');
    fireEvent.changeText(iconSelect, 'checkmark');
    await waitFor(() => {
      expect(getByText('checkmark')).toBeTruthy();
    });
  });

  it('should handle form submission correctly', async () => {
    const { getByText, getByPlaceholderText } = render(<AddCategoryForm />);

    const categoryInput = getByPlaceholderText('Category');
    fireEvent.changeText(categoryInput, 'New Category');

    const iconSelect = getByPlaceholderText('Icon');
    fireEvent.changeText(iconSelect, 'checkmark');

    const submitButton = getByText('add');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(addFirestoreCategory).toHaveBeenCalledWith({
        name: 'New Category',
        iconName: 'checkmark',
        color: '#7fffff',
        userId: '',
        tasksAmount: 0,
      });
    });
  });

  it('should show error message when validation fails', async () => {
    const { getAllByText, getByText } = render(<AddCategoryForm />);

    const submitButton = getByText('add');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getAllByText('Required')).toBeTruthy();
    });
  });
});
