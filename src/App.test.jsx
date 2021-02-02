import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './Page';

test('Page 컴포넌트 출력확인', () => {
  const state = {
    taskTitle: '',
    tasks: [],
  };
  const { taskTitle, tasks } = state;
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  render(<App
    taskTitle={taskTitle}
    tasks={tasks}
    onChangeTitle={handleChangeTitle}
    onClickAddTask={handleClickAddTask}
    onClickDeleteTask={handleClickDeleteTask}
  />);

  const header = screen.getByText('To-do');
  const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
  const paragraph = screen.getByText('할 일이 없어요!');

  expect(header).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});
