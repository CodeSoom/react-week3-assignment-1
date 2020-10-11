import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App Component', () => {
  const addTaskButton = '추가';
  const deleteTaskButton = '완료';

  const taskInputPlaceholder = '할 일을 입력해 주세요';
  const isEmptyTaskNotice = '할 일이 없어요!';

  const newTask = '뭐라도 하기';
  const newTasks = [
    'Input 컴포넌트 테스트 만들기',
    'Item 컴포넌트 테스트 만들기',
    'List 컴포넌트 테스트 만들기',
    'Input 컴포넌트 테스트 만들기',
  ];

  const init = () => {
    const utils = render(<App />);
    return { ...utils };
  };

  context('Can this app enter to-do title?', () => {
    it('when empty value', () => {
      const { getByPlaceholderText } = init();

      const input = getByPlaceholderText(taskInputPlaceholder);

      expect(input.value).toBe('');
    });

    it('when entered value', () => {
      const { getByPlaceholderText } = init();

      const input = getByPlaceholderText(taskInputPlaceholder);

      fireEvent.change(input, { target: { value: newTask } });

      expect(input.value).toBe(newTask);
    });
  });

  context('Can this app add to-do?', () => {
    it('when no title', () => {
      const { container, getByText } = init();

      fireEvent.click(getByText(addTaskButton));

      expect(container).not.toHaveTextContent(isEmptyTaskNotice);
    });

    it('when specific title', () => {
      const { container, getByPlaceholderText, getByText } = init();

      fireEvent.change(getByPlaceholderText(taskInputPlaceholder), {
        target: { value: newTask },
      });

      fireEvent.click(getByText(addTaskButton));

      expect(container).not.toHaveTextContent(isEmptyTaskNotice);
      expect(container).toHaveTextContent(newTask);
    });
  });

  it('Can this app delete to-do list?', () => {
    const {
      container, getByPlaceholderText, getByText, getAllByText,
    } = init();

    const input = getByPlaceholderText(taskInputPlaceholder);
    const addButton = getByText(addTaskButton);

    newTasks.forEach((task) => {
      fireEvent.change(input, { target: { value: task } });
      fireEvent.click(addButton);
    });

    const deleteButtons = getAllByText(deleteTaskButton);

    expect(deleteButtons).toHaveLength(newTasks.length);

    deleteButtons.forEach((button) => fireEvent.click(button));

    expect(container).toHaveTextContent(isEmptyTaskNotice);
  });
});
