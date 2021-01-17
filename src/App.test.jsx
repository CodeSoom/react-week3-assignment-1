import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

import testIds from './componentTestID';

describe('App', () => {
  const {
    container,
    getByTestId,
    getByText,
    getByPlaceholderText,
  } = render((<App />));

  const task = '새로운 할 일';
  const addTaskButton = getByText('추가');
  const taskInput = getByPlaceholderText('할 일을 입력해 주세요');

  context('When loaded', () => {
    it('show page component', () => {
      const pageComponent = getByTestId(testIds.Page);
      expect(container).toContainElement(pageComponent);
    });
  });

  context('When click add-button', () => {
    it('show new task in task-list', () => {
      fireEvent.change(taskInput, { target: { value: task } });
      fireEvent.click(addTaskButton);

      expect(container).toHaveTextContent(task);
    });
  });

  context('When click complete-button', () => {
    it('diappear task in task-list', () => {
      const completeTaskButton = getByText('완료');
      fireEvent.click(completeTaskButton);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
