import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const placeholderText = '할 일을 입력해 주세요';
  const emptyTasksText = '할 일이 없어요!';
  const addTaskButtonText = '추가';
  const deleteTaskButtonText = '완료';
  const tasks = [
    '아무것도 안하기',
    '더욱 더 아무것도 안하기',
    '본격적으로 아무것도 안하기',
  ];

  it('check elements', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    getByText(emptyTasksText);
    getByText(addTaskButtonText);
    getByPlaceholderText(placeholderText);
  });

  context('function test', () => {
    it('tasks 추가 후 전부 삭제하는 시나리오', () => {
      const { getByText, getAllByText, getByRole } = render(<App />);

      tasks.forEach((task, i) => {
        const input = getByRole('textbox');

        fireEvent.change(input, { target: { value: task } });

        expect(input.value).toEqual(task);

        fireEvent.click(getByText(addTaskButtonText));

        getByText(task);
        expect(input.value).toEqual('');
        expect(getAllByText(deleteTaskButtonText))
          .toHaveLength(i + 1);
      });
      tasks.forEach((task) => getByText(task));

      const deleteTaskButtons = getAllByText(deleteTaskButtonText);

      expect(deleteTaskButtons).toHaveLength(3);

      deleteTaskButtons.forEach((button) => fireEvent.click(button));

      getByText(emptyTasksText);
    });
  });
});
