import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page 컴포넌트', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  context('taskTitle과 tasks 값이 없다면', () => {
    const taskTitle = '';
    const tasks = [];

    it('초기 화면을 보여준다', () => {
      const { container } = render((
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
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('taskTitle 값이 있다면', () => {
    const taskTitle = 'taskTitle';
    const tasks = [];

    it('값을 보여준다', () => {
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
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks 값이 있다면', () => {
    const taskTitle = '';
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
      {
        id: 2,
        title: '할일2',
      },
      {
        id: 3,
        title: '할일3',
      },
    ];

    it('할일들과 완료버튼들을 보여준다', () => {
      const { container } = render((
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
      expect(container).toHaveTextContent('추가');
      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
        expect(container).toHaveTextContent('완료');
      });
    });
  });

  context('taskTitle과 tasks 모두 값이 있다면', () => {
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
      {
        id: 3,
        title: '할일3',
      },
    ];

    it('input 값, 할일들, 완료버튼들을 보여준다', () => {
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
      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
        expect(container).toHaveTextContent('완료');
      });
    });
  });

  context('값이 변하면', () => {
    const taskTitle = 'taskTitle';
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
    ];
    it('handleChangeTitle 이벤트가 발생한다', () => {
      const { getByLabelText } = render((
        <Page
          taskTitle={taskTitle}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '입력 값' } });

      expect(handleChangeTitle).toBeCalledTimes(1);
    });
  });

  context('추가를 누르면', () => {
    const taskTitle = 'taskTitle';
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
    ];

    it('handleClickAddTask 이벤트가 발생한다', () => {
      const { getByText } = render((
        <Page
          taskTitle={taskTitle}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalledTimes(1);
    });
  });

  context('완료를 누르면', () => {
    const taskTitle = 'taskTitle';
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
    ];

    it('handleClickDeleteTask 이벤트가 발생한다', () => {
      const { getByText } = render((
        <Page
          taskTitle={taskTitle}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(handleClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClickDeleteTask).toBeCalledWith(1);
    });
  });
});
