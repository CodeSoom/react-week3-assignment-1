import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

const getInitialProps = () => ({
  taskTitle: 'hello world',
  onChangeTitle: jest.fn(),
  onClickAddTask: jest.fn(),
  tasks: [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '뭐라도 안하기',
    },
  ],
  onClickDeleteTask: jest.fn(),
});

test('메인 앱 헤딩(To-do)이 보인다.', () => {
  const {
    taskTitle, tasks, onChangeTitle, onClickAddTask, onClickDeleteTask,
  } = getInitialProps();

  render(<Page
    taskTitle={taskTitle}
    tasks={tasks}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    onClickDeleteTask={onClickDeleteTask}
  />);
  screen.getByText(/To-do/);
});

test('입력된 taskTitle이 보인다.', () => {
  const {
    taskTitle, tasks, onChangeTitle, onClickAddTask, onClickDeleteTask,
  } = getInitialProps();

  render(<Page
    taskTitle={taskTitle}
    tasks={tasks}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    onClickDeleteTask={onClickDeleteTask}
  />);

  screen.getByDisplayValue(/hello world/);
});

test('할 일을 입력하고 추가 버튼을 누르면 관련 함수들(onChangeTitle, onClickDeleteTask)이 실행된다.', () => {
  const {
    taskTitle, tasks, onChangeTitle, onClickAddTask, onClickDeleteTask,
  } = getInitialProps();

  render(<Page
    taskTitle={taskTitle}
    tasks={tasks}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    onClickDeleteTask={onClickDeleteTask}
  />);

  fireEvent.change(screen.getByPlaceholderText(/할 일을 입력해 주세요/), { target: { value: 'world' } });
  expect(onChangeTitle).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByText(/추가/));
  expect(onClickAddTask).toHaveBeenCalledTimes(1);
});

test('완료 버튼을 클릭하면 onClickDeleteTask가 실행된다.', () => {
  const {
    taskTitle, tasks, onChangeTitle, onClickAddTask, onClickDeleteTask,
  } = getInitialProps();

  render(<Page
    taskTitle={taskTitle}
    tasks={tasks}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    onClickDeleteTask={onClickDeleteTask}
  />);

  fireEvent.click(screen.getAllByText(/완료/)[0]);
  expect(onClickDeleteTask).toHaveBeenCalledTimes(1);
});
