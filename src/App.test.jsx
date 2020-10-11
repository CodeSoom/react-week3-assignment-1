/*
 * TODO:
 * 1. 렌더링이 되면
 *   1-1. To-do 타이틀이 보여야 한다.
 *   1-2. 할 일 이라는 입력창 타이틀과 입력창이 보여야 한다.
 *   1-3. 추가 라는 버튼이 보여야 한다.
 *   1-4. 할 일이 없어요! 라는 글 목록이 보여야 한다.
 */
import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const renderHelper = (taskTitle = '', tasks = []) => render((
    <App
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  context('렌더링 되면', () => {
    it('초기 화면에 렌더링 되야하는 텍스트를 보여준다.', () => {
      const { container } = renderHelper();

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
