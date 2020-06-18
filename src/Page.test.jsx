import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('PageWithoutTasks', () => {
  const taskTitle = '';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const tasks = [];
  const onClickDeleteTask = jest.fn();

  const { container } = render(
    (<Page
      taskTitle={taskTitle}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />),
  );

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('PageWithTasks', () => {
  const taskTitle = '두 번째 할 일';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const tasks = [{
    id: 1,
    title: '첫 번째 할 일',
  }];
  const onClickDeleteTask = jest.fn();

  const { container, getByLabelText } = render(
    (<Page
      taskTitle={taskTitle}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />),
  );

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('첫 번째 할 일');
  expect(container).toHaveTextContent('완료');

  const input = getByLabelText('할 일');

  expect(input.value).toBe('두 번째 할 일');
});
