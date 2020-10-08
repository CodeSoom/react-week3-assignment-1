/*
 * TODO:
 *  1. 처음 렌더링이 되면
 *    1-1. To-do 라는 타이틀이 보여야 한다.
 *    1-1-2. 할 일 이라는 입력창 타이틀과 입력창이 보여야 한다.
 *    1-1.3 할 일이 없어요! 라는 placeholder 값이 보여야 한다.
 *  2. 입력값이 없을 때
 *    2-1. 할 일이 없어요! 라는 placeholder 값이 보여야 한다.
 *  3. 입력값이 있을 때
 *    3-1. 해당 입력값이 입력창에 보여야 한다.
 *  4. 할 일 목록이 보여야 한다.
 *    4-1. 할 일 목록이 없으면 할 일이 없어요! 라는 placeholder 값이 보여야 한다.
 *    4-2. 할 일 목록이 있으면 할 일 목록이 보여야 한다.
 *  5. 글을 입력하면 입력창에 글이 보여야 한다.
 *    5-1. change 이벤트가 잘 넘어 오는지 확인한다.
 *  6. 글 추가 버튼을 누를 때
 * 		6-1. 할 일 목록에 추가 되야 한다.
 *    6-2. 입력창에 값이 비워진다.
 */

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  context('처음 렌더링 되면', () => {
    it('To-do 타이틀을 보여준다.', () => {
      const taskTitle = '';
      const tasks = [];
      const { container } = render(
        <Page
          taskTitle={taskTitle}
          tasks={tasks}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
        />
      );
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
    });
  });

  context('Input 에 입력값이 없을 때', () => {
    it('할 일을 입력해 주세요 라는 placeholder 값을 보여준다', () => {
      const taskTitle = '';
      const tasks = [];

      const { getByPlaceholderText } = render(
        <Page
          taskTitle={taskTitle}
          tasks={tasks}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
        />
      );

      const inputNode = getByPlaceholderText('할 일을 입력해 주세요');

      expect(inputNode).toBeTruthy();
      expect(inputNode).toHaveProperty('value', '');
    });
  });

  context('Input 에 입력값이 있을 때', () => {
    it('입력창에 입력된 값을 보여 준다', () => {
      const taskTitle = '테스트 하기';

      const { getByPlaceholderText } = render(
        <Page
          taskTitle={taskTitle}
          tasks={[]}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
        />
      );

      const InputNode = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(InputNode, {
        target: { value: taskTitle },
      });

      expect(InputNode).toHaveProperty('value', '테스트 하기');
    });

    it('추가 버튼을 클릭하면 입력창의 글이 삭제 된다', () => {
      const taskTitle = '테스트 하기';

      const { getByText } = render(
        <Page
          taskTitle={taskTitle}
          tasks={[]}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
        />
      );

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
    });
  });

  context('할일 목록의 글이 있을 때', () => {
    const tasks = [
      {
        id: 1,
        title: '테스트하기',
      },
      {
        id: 2,
        title: '운동하기',
      },
    ];

    it('할 일 목록과 완료 버튼이 보여야 한다', () => {
      const { container, queryAllByText } = render(<Page tasks={tasks} />);
      const buttons = queryAllByText('완료');
      expect(container).toHaveTextContent('테스트하기');
      expect(container).toHaveTextContent('운동하기');
      expect(tasks.length).toBe(buttons.length);
    });

    it('완료 버튼 클릭시 글이 삭제 된다', () => {
      const taskTitle = '';
      const { queryAllByText } = render(
        <Page
          taskTitle={taskTitle}
          tasks={tasks}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
        />
      );

      const buttons = queryAllByText('완료');

      buttons.map((button) => {
        fireEvent.click(button);
      });

      tasks.map((task) => {
        expect(handleClickDeleteTask).toBeCalledWith(task.id);
      });
    });
  });

  context('할일 목록의 글이 없을 때', () => {
    it('할 일이 없어요! 라는 글을 보여 준다', () => {
      const tasks = [];
      const { container } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });
});
