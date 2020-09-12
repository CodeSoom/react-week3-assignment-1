import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('할 일 목록이 없을 경우', () => {
    context('할 일이 없을 경우', () => {
      it('할 일이 없어요!가 표시되고 input에는 값이 표시되지 않는다.', () => {
        const taskTitle = '';
        const handleChangeTitle = jest.fn();
        const handleClickAddTask = jest.fn();
        const tasks = [];
        const handleClickDeleteTask = jest.fn();

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
        expect(container).toHaveTextContent('추가');
        expect(container).toHaveTextContent('할 일이 없어요!');

        const input = getByLabelText('할 일');

        expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
        expect(input).toHaveAttribute('value', '');
      });
    });

    context('할 일이 있을 경우', () => {
      it('할 일이 없어요!가 표시되고, input에 값이 표시된다.', () => {
        const taskTitle = 'do something';
        const handleChangeTitle = jest.fn();
        const handleClickAddTask = jest.fn();
        const tasks = [];
        const handleClickDeleteTask = jest.fn();

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
        expect(container).toHaveTextContent('추가');
        expect(container).toHaveTextContent('할 일이 없어요!');

        const input = getByLabelText('할 일');

        expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
        expect(input).toHaveAttribute('value', 'do something');
      });
    });
  });

  context('할 일 목록이 있을 경우', () => {
    context('할 일이 없을 경우', () => {
      it('할 일이 표시되고, input에는 값이 표시되지 않는다. ', () => {
        const taskTitle = '';
        const handleChangeTitle = jest.fn();
        const handleClickAddTask = jest.fn();
        const tasks = [{ id: 1, title: 'do something' }];
        const handleClickDeleteTask = jest.fn();

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
        expect(container).toHaveTextContent('추가');
        expect(container).toHaveTextContent('do something');
        expect(container).toHaveTextContent('완료');

        const input = getByLabelText('할 일');

        expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
        expect(input).toHaveAttribute('value', '');
      });
    });

    context('할 일이 있을 경우', () => {
      it('할 일이 표시되고, input에는 값이 표시된다.', () => {
        const taskTitle = 'do something';
        const handleChangeTitle = jest.fn();
        const handleClickAddTask = jest.fn();
        const tasks = [{ id: 1, title: 'do something' }];
        const handleClickDeleteTask = jest.fn();

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
        expect(container).toHaveTextContent('추가');
        expect(container).toHaveTextContent('do something');
        expect(container).toHaveTextContent('완료');

        const input = getByLabelText('할 일');

        expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
        expect(input).toHaveAttribute('value', 'do something');
      });
    });
  });

  context('input에 값을 입력하고 추가 버튼을 누르면', () => {
    it('input에 값이 표시되었다가, 값이 사라진다.', () => {
      const handleChangeTitle = jest.fn();
      const handleClickAddTask = jest.fn();
      const tasks = [];
      const handleClickDeleteTask = jest.fn();

      const { getByLabelText, getByText } = render((
        <Page
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      const input = getByLabelText('할 일');

      fireEvent.change(input, { target: { value: 'do something' } });

      expect(input).toHaveValue('do something');

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();

      expect(input).toHaveAttribute('value', '');
    });
  });
});
