import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  context('with with empty todos', () => {
    it('renders empty message', () => {
      const { container } = render((
        <App />
      ));

      const inputBox = container.querySelector('#input-task-title');

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(inputBox).toBeInTheDocument();
      expect(container).toHaveTextContent('추가');
      expect(inputBox.value).toBe('');

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with add input todo', () => {
    const userInputText = 'Distribute new version';

    it('renders todo and be able to complete todo', () => {
      const userInputEvent = { target: { value: userInputText } };
      const { container, getByText } = render((
        <App />
      ));
      const inputBox = container.querySelector('#input-task-title');

      fireEvent.change(inputBox, userInputEvent);
      expect(inputBox.value).toBe(userInputText);

      fireEvent.click(getByText('추가'));
      expect(container).not.toHaveTextContent('할 일이 없어요!');
      expect(container).toHaveTextContent(userInputText);
      expect(container).toHaveTextContent('완료');

      fireEvent.click(getByText('완료'));
      expect(container).not.toHaveTextContent(userInputText);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
