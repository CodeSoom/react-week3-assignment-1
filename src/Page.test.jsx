import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page 컴포넌트', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  context('화면을 그릴때', () => {
    const taskTitle = 'taskTitle';
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
      {
        id: 2,
        title: '할일2',
      },
    ];

    it('h1, Input 컴포넌트, List 컴포넌트를 보여준다', () => {
      const { container, getByLabelText } = render((
        <Page
          taskTitle={taskTitle}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(getByLabelText('할 일')).toHaveDisplayValue('taskTitle');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할일1');
      expect(container).toHaveTextContent('할일2');

      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '입력 값' } });

      expect(handleChangeTitle).toBeCalledTimes(1);
    });
  });
});
