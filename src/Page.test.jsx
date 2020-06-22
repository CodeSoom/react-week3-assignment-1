import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const renderPage = (taskTitle, tasks) => (
    render((
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ))
  );

  context('랜더링 확인', () => {
    it('To-do 타이틀 활인', () => {
      const taskTitle = '';
      const tasks = [];
      const { getByText } = renderPage(taskTitle, tasks);

      expect(getByText('To-do')).toBeTruthy();
    });

    it('Input, List 컴포넌트 확인', () => {
      const taskTitle = '';
      const tasks = [];
      const { getByText, getByPlaceholderText } = renderPage(taskTitle, tasks);

      expect(getByText('할 일')).toBeTruthy();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeTruthy();
      expect(getByText('추가')).toBeTruthy();
      expect(getByText('할 일이 없어요!')).toBeTruthy();
    });
  });

  context('핸들러 확인', () => {
    it('onClickDeleteTask 호출', () => {
      const taskTitle = '';
      const tasks = [{
        id: 1,
        title: '뭐라도 하기',
      }];
      const { getByText } = renderPage(taskTitle, tasks);

      expect(handleClickDeleteTask).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(handleClickDeleteTask).toBeCalledWith(1);
    });
  });
});
