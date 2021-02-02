import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

/**
 * 테스트 목록
 *
 * To do 타이틀이 렌더링되는지
 * Input 컴포넌트가 렌더링 되었을때
 *  taskTitle이 화면에 보여지는지
 * List 컴포넌트가 렌더링되었을때
 *  tasks가 화면에 보여지는지
 */

const taskTitle = '홈트 하기';
const handleChageTitle = jest.fn();

const tasks = [
  { id: 1, title: '삼겹살 먹기' },
  { id: 2, title: '코딩하기' },
];
const handleClickAddTask = jest.fn();
const handleClickDeleteTask = jest.fn();

const rederPage = () => render(
  <Page
    taskTitle={taskTitle}
    handleChageTitle={handleChageTitle}
    handleClickAddTask={handleClickAddTask}
    tasks={tasks}
    handleClickDeleteTask={handleClickDeleteTask}
  />,
);

describe('Page', () => {
  it('title is rendered', () => {
    const { container } = rederPage();

    expect(container).toHaveTextContent('To-do');
  });

  context('When Input component is rendered', () => {
    it('task title is displayed', () => {
      const { getByDisplayValue } = rederPage();
      expect(getByDisplayValue(taskTitle)).toBeInTheDocument();
    });
  });

  context('When List component is rendered', () => {
    it('tasks is displayed', () => {
      const { container } = rederPage();

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);
    });
  });
});
