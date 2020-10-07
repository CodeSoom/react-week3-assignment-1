import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const placeholderText = '할 일을 입력해 주세요';
  const emptyTasksText = '할 일이 없어요!';
  const addTaskButtonText = '추가';
  const deleteTaskButtonText = '완료';

  function addTaskTest({ task, numberOfTasks }) {
    const { getByText, getAllByText, getByRole } = screen;

    const input = getByRole('textbox');
    const addTaskButton = getByText(addTaskButtonText);

    fireEvent.change(input, { target: { value: task } });

    expect(input.value).toEqual(task);

    fireEvent.click(addTaskButton);

    getByText(task);
    expect(input.value).toEqual('');
    expect(getAllByText(deleteTaskButtonText)).toHaveLength(numberOfTasks);
  }

  it('check elements', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    getByText(emptyTasksText);
    getByPlaceholderText(placeholderText);
  });

  context('function test', () => {
    const tasks = [
      '아무것도 안하기',
      '더욱 더 아무것도 안하기',
      '본격적으로 아무것도 안하기',
    ];

    it('tasks 추가 후 전부 삭제하는 시나리오', () => {
      const { getByText, getAllByText } = render(<App />);

      tasks.forEach((task, i) => addTaskTest({ task, numberOfTasks: i + 1 }));
      tasks.forEach((task) => getByText(task));

      const deleteTaskButtons = getAllByText(deleteTaskButtonText);

      expect(deleteTaskButtons).toHaveLength(3);

      deleteTaskButtons.forEach((button) => fireEvent.click(button));

      getByText(emptyTasksText);
    });
  });
});
