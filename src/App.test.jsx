import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { userInputText } from './TestData';

describe('App', () => {
  context('without todos', () => {
    it('renders empty message', () => {
      const { container } = render((
        <App />
      ));

      const inputBox = container.querySelector('#input-task-title');

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');

      expect(inputBox).toBeInTheDocument();
      expect(inputBox.value).toBe('');
    });
  });

  context('when add todo', () => {
    it('renders added todo and be able to complete todo', () => {
      const userInputEvent = { target: { value: userInputText } };
      const { container, getByText } = render((
        <App />
      ));
      const inputBox = container.querySelector('#input-task-title');

      // input todo
      fireEvent.change(inputBox, userInputEvent);
      expect(inputBox.value).toBe(userInputText);

      // add todo
      fireEvent.click(getByText('추가'));
      expect(container).not.toHaveTextContent('할 일이 없어요!');
      expect(container).toHaveTextContent(userInputText);
      expect(container).toHaveTextContent('완료');

      // complete todo
      fireEvent.click(getByText('완료'));
      expect(container).not.toHaveTextContent(userInputText);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
