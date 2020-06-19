import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const { container } = render(
    (
      <App />
    ),
  );

  expect(handleChangeTitle).not.toBeCalled();
  expect(handleClickAddTask).not.toBeCalled();
  expect(handleClickDeleteTask).not.toBeCalled();

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('Add task', () => {
  const initState = {
    newId: 100,
    taskTitle: '',
    tasks: [],
  };

  const { newId, tasks } = initState;

  const newTask = {
    id: newId,
    title: '새로운 할 일',
  };

  const newState = {
    ...initState,
    newId: newId + 1,
    taskTitle: '',
    tasks: [...tasks, newTask],
  };

  expect(newState.newId).toBe(101);
  expect(newState.taskTitle).toBe('');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0]).toEqual(newTask);
});

test('Delete task', () => {
  const doneTaskId = 1;
  const tasks = [{
    id: 1,
    title: '첫 번째 할 일',
  }, {
    id: 2,
    title: '두 번째 할 일',
  }];

  expect(tasks.length).toBe(2);

  const existed = tasks.filter((task) => task.id !== doneTaskId);

  expect(existed.length).toBe(tasks.length - 1);
  expect(existed[0]).toEqual(tasks[1]);
});

test('Input text', () => {
  const input = '첫 번째 할 일';
  const initState = {
    newId: 100,
    taskTitle: '',
    tasks: [],
  };

  const newState = {
    ...initState,
    taskTitle: input,
  };

  expect(newState.taskTitle).toBe(input);
});
