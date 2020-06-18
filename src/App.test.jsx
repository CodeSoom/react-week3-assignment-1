import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  render(
    (
      <App />
    ),
  );
});

test('handleClickAddTask', () => {
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
});
