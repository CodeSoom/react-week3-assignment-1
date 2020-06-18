import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  let handleChangeTitle;
  let handleClickAddTask;
  let handleClickDeleteTask;

  beforeEach(() => {
    handleChangeTitle = jest.fn();
    handleClickAddTask = jest.fn();
    handleClickDeleteTask = jest.fn();
  });


  context('render가 잘 되었다면', () => {
    it(' "To-do", "할 일", "추가", "할 일이 없어요!" 문구가 보인다.', () => {
      const { container, getByText } = render(
        <Page
          taskTitle=""
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={[]}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalledTimes(1);
    });
  });

  context('사용자가 할 일을 입력하면', () => {
    it(' onChangeTitle이 실행된다. ', () => {
      const { getByLabelText } = render(
        <Page
          taskTitle=""
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={[]}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: '바뀐다',
        },
      });

      expect(handleChangeTitle).toBeCalledTimes(1);
    });
  });

  context('사용자가 할 일을 입력한 후 추가버튼을 누르면', () => {
    it(' onClickAddTask 이 실행된다. ', () => {
      const { getByText } = render(
        <Page
          taskTitle="추가될 할일"
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={[]}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalledTimes(1);
    });
  });

  context('할 일에서 완료 버튼을 누르면', () => {
    const tasks = [
      {
        id: 1,
        title: '할 일1',
      },
    ];

    it(' onClickDeleteTask 이 실행된다. ', () => {
      const { getByText } = render(
        <Page
          taskTitle=""
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      expect(handleClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClickDeleteTask).toBeCalledTimes(1);
    });
  });
});
