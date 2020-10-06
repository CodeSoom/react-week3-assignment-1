import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const placeholder = '할 일을 입력해 주세요';
  const emptyTasksText = '할 일이 없어요!';

  context('initial status', () => {
    it('placeholder 확인', () => {
      const { getByPlaceholderText } = render(<App />);
      const input = getByPlaceholderText(placeholder);

      expect(input.getAttribute('placeholder')).toEqual(placeholder);
    });

    it('"할 일이 없어요!" 확인', () => {
      const { container } = render(<App />);

      expect(container).toHaveTextContent(emptyTasksText);
    });
  });

  context('function test', () => {
    const tasks = [
      '아무것도 안하기',
      '더욱 더 아무것도 안하기',
      '본격적으로 아무것도 안하기',
      '',
    ];

    function addTaskTest({ utils, task, numberOfTasks }) {
      const input = utils.getByPlaceholderText(placeholder);
      const addTaskButton = utils.getByText('추가');

      fireEvent.change(input, { target: { value: task } });

      expect(input.value).toEqual(task);

      fireEvent.click(addTaskButton);

      expect(input.value).toEqual('');
      if (task !== '') expect(utils.container).toHaveTextContent(task);
      expect(utils.getAllByText('완료').length).toEqual(numberOfTasks);
    }

    it('task 4개 추가 후 전부 삭제하는 시나리오', () => {
      const utils = render(<App />);

      addTaskTest({ utils, task: tasks[0], numberOfTasks: 1 });
      addTaskTest({ utils, task: tasks[1], numberOfTasks: 2 });
      addTaskTest({ utils, task: tasks[2], numberOfTasks: 3 });
      addTaskTest({ utils, task: tasks[3], numberOfTasks: 4 });

      fireEvent.click(utils.getAllByText('완료')[3]);

      expect(utils.container).toHaveTextContent(tasks[0]);
      expect(utils.container).toHaveTextContent(tasks[1]);
      expect(utils.container).toHaveTextContent(tasks[2]);
      expect(utils.getAllByText('완료').length).toEqual(3);

      utils.getAllByText('완료').forEach((button) => {
        fireEvent.click(button);
      });

      expect(utils.container).toHaveTextContent(emptyTasksText);
    });
  });
});
