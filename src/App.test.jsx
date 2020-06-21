import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('when start application', () => {
    it('first display', () => {
      // When
      const { container } = render(
        (
          <App />
        ),
      );

      // Then
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('when change text', () => {
    it('call handleChangeTitle function', () => {
      // When
      const { getByLabelText } = render(
        (
          <App />
        ),
      );

      const input = getByLabelText('할 일');
      fireEvent.change(input, { target: { value: '첫 번째 할 일' } });

      // Then
      expect(input.value).toBe('첫 번째 할 일');
    });
  });

  context('when click 추가', () => {
    it('call handleClickAddTask function', () => {
      // When
      const { container, getByText, getByLabelText } = render(
        (
          <App />
        ),
      );

      fireEvent.change(getByLabelText('할 일'), { target: { value: '첫 번째 할 일' } });
      fireEvent.click(getByText('추가'));

      // Then
      expect(container).toHaveTextContent('첫 번째 할 일');
      expect(container).toHaveTextContent('완료');
    });
  });

  context('when click 완료', () => {
    it('call handleClickDeleteTask function', () => {
      // When
      const { container, getByText, getByLabelText } = render(
        (
          <App />
        ),
      );

      fireEvent.change(getByLabelText('할 일'), { target: { value: '첫 번째 할 일' } });
      fireEvent.click(getByText('추가'));
      fireEvent.click(getByText('완료'));

      // Then
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
