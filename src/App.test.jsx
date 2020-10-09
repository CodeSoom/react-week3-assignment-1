import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App Component', () => {
  const inputLabelText = '할 일';
  const addButtonText = '추가';
  const completeButtonText = '완료';
  const newTitle = '밥 먹기';

  context('when user enter new title', () => {
    it('input has new title', () => {
      const { getByLabelText } = render(<App />);
      const input = getByLabelText(inputLabelText);

      expect(input).not.toHaveValue(newTitle);

      fireEvent.change(input, { target: { value: newTitle } });

      expect(input).toHaveValue(newTitle);
    });
  });

  context('when user click add-button', () => {
    it('shows new task', () => {
      const { queryByText, getByText, getByLabelText } = render(<App />);
      const addButton = getByText(addButtonText);
      const input = getByLabelText(inputLabelText);

      fireEvent.change(input, { target: { value: newTitle } });

      expect(queryByText(newTitle)).toBeNull();

      fireEvent.click(addButton);

      expect(queryByText(newTitle)).toBeInTheDocument();
      expect(getByText(completeButtonText)).toBeInTheDocument();
    });
  });

  context('when user click complete-button', () => {
    it('the task disappears', () => {
      const { getByText, getByLabelText, queryByText } = render(<App />);
      const addButton = getByText(addButtonText);
      const input = getByLabelText(inputLabelText);

      fireEvent.change(input, { target: { value: newTitle } });
      fireEvent.click(addButton);

      expect(queryByText(newTitle)).not.toBeNull();

      fireEvent.click(getByText(completeButtonText));

      expect(queryByText(newTitle)).toBeNull();
    });
  });
});
