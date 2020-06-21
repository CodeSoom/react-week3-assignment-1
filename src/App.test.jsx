import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App 컨포넌트 테스팅', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const { container } = render(<App />);

  expect(handleChangeTitle).not.toBeCalled();
  expect(handleClickAddTask).not.toBeCalled();
  expect(handleClickDeleteTask).not.toBeCalled();

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('할 일 작성', () => {
  const newTaskTitle = '100 번 할 일';
  const state = {
    newId: 100,
    taskTitle: '',
    tasks: [],
  };

  const newState = {
    ...state,
    taskTitle: newTaskTitle,
  };

  expect(newState.taskTitle).toBe(newTaskTitle);
});

test('할 일 추가', () => {
  const state = {
    newId: 100,
    taskTitle: '',
    tasks: [],
  };

  const newTask = {
    id: state.newId,
    title: '100 번 할 일',
  };

  const newState = {
    ...state,
    newId: state.newId + 1,
    taskTitle: '',
    tasks: [newTask, ...state.tasks],
  };

  expect(newState.newId).toBe(101);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0]).toEqual(newTask);
});

test('할 일 완료', () => {
  const tasks = [{
    id: 100,
    title: '100 번 할 일',
  }, {
    id: 101,
    title: '101 번 할 일',
  }];

  const testingTask = {
    id: 101,
    title: '101 번 할 일',
  };

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  expect(handleChangeTitle).not.toBeCalled();
  expect(handleClickAddTask).not.toBeCalled();

  const handleClickDeleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
  };

  expect(tasks.length).toBe(2);

  handleClickDeleteTask(100);

  expect(tasks.length).toBe(1);
  expect(tasks[0]).toEqual(testingTask);
});
