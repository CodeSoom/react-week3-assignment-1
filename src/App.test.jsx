import React from 'react';

import { render, fireEvent, getByPlaceholderText } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  context('when change input value', () => {
    it('change input value', () => {
      const { getByPlaceholderText } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, {
        target: {
          value: 'TDD 연습',
        },
      });

      expect(input).toHaveDisplayValue('TDD 연습');
    });
  });

  context('when want to add task', () => {
    it('Click Add Button', () => {
      const { container, getByPlaceholderText, getByText } = render((<App />));
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, {
        target: {
          value: 'TDD 연습',
        },
      });

      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent('TDD 연습');
    });
  });

  context('when want to remove task', () => {
    it('Click 완료 Button', () => {
      const { container, getByPlaceholderText, getByText } = render((<App />));

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, {
        target: {
          value: 'TDD 연습',
        },
      });

      fireEvent.click(getByText('추가'));

      fireEvent.click(getByText('완료'));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
