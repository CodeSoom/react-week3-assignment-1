import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

const propsForTest = {
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
};

describe('Page 컴포넌트의', () => {
  const {
    taskTitle, tasks, onChangeTitle, onClickAddTask, onClickDeleteTask,
  } = propsForTest;

  beforeEach(() => {
    render(<Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      onClickDeleteTask={onClickDeleteTask}
    />);
  });

  test('메인 타이틀이 보인다.', () => {
    screen.getByText('To-do');
  });

  describe('할 일 입력에서', () => {
    test('입력된 taskTitle이 보인다.', () => {
      screen.getByDisplayValue('hello world');
    });

    test('추가 버튼을 누르면 할 일이 추가된다.', () => {
      fireEvent.click(screen.getByText('추가'));
      expect(onClickAddTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('할 일 목록에서', () => {
    test('완료 버튼을 클릭하면 완료 처리된다.', () => {
      fireEvent.click(screen.getAllByText('완료')[0]);
      expect(onClickDeleteTask).toHaveBeenCalledTimes(1);
    });
  });
});
