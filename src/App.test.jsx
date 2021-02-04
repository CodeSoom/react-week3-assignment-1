import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    const {
      container,
      getByLabelText,
      getByText,
    } = render(<App />);

    return {
      container,
      getByLabelText,
      getByText,
    };
  }

  context('Without tasks', () => {
    it('displays "no task message"', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('updates input value when value changes', () => {
      const { getByLabelText } = renderApp();

      const input = getByLabelText('할 일');

      fireEvent.change(input, { target: { value: '아무것도 하지 않기' } });

      expect(input.value).toBe('아무것도 하지 않기');
    });

    it('adds a task when add button is clicked', () => {
      const { container, getByLabelText, getByText } = renderApp();

      const input = getByLabelText('할 일');
      const addButton = getByText('추가');

      fireEvent.change(input, { target: { value: '아무것도 하지 않기' } });
      fireEvent.click(addButton);

      expect(container).toHaveTextContent('아무것도 하지 않기');
    });
  });

  context('With tasks', () => {
    it('deletes the task whose button is clicked', () => {
      const { container, getByLabelText, getByText } = renderApp();

      const input = getByLabelText('할 일');
      const addButton = getByText('추가');

      fireEvent.change(input, { target: { value: '아무것도 하지 않기' } });
      fireEvent.click(addButton);

      const doneButton = getByText('완료');

      fireEvent.click(doneButton);

      expect(container).not.toHaveTextContent('아무것도 하지 않기');
    });
  });
});
