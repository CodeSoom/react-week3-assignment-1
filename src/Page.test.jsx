import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Page from './Page';
import todos from './Todos';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  context('without todos', () => {
    it('renders empty message', () => {
      const emptyTodos = [];
      const { container } = render((
        <Page
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={emptyTodos}
        />
      ));

      const inputBox = container.querySelector('#input-task-title');

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');

      expect(inputBox).toBeInTheDocument();
      expect(inputBox.value).toBe('');

      expect(handleChangeTitle).not.toBeCalled();
      expect(handleClickAddTask).not.toBeCalled();
    });
  });

  context('when input todo', () => {
    const userInputText = 'Distribute new version';
    const emptyTodos = [];
    it('renders todo', () => {
      const userInputEvent = { target: { value: userInputText } };
      const { container } = render((
        <Page
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={emptyTodos}
        />
      ));

      const inputBox = container.querySelector('#input-task-title');

      fireEvent.change(inputBox, userInputEvent);
      expect(inputBox.value).toBe(userInputText);
      expect(handleChangeTitle).toBeCalledTimes(1);
    });

    it('can clicked to add todo', () => {
      const { getByText } = render((
        <Page
          taskTitle={userInputText}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={emptyTodos}
        />
      ));

      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalledTimes(1);
    });
  });

  context('with todos', () => {
    it('renders todos', () => {
      const handleClickCompleteTask = jest.fn();

      const { container, getAllByText } = render((
        <Page
          tasks={todos}
          onClickDeleteTask={handleClickCompleteTask}
        />
      ));

      todos.forEach((element) => {
        expect(container).toHaveTextContent(element.title);
      });

      expect(container).not.toHaveTextContent('할 일이 없어요!');
      expect(container).toHaveTextContent('완료');

      expect(handleClickCompleteTask).not.toBeCalled();

      getAllByText('완료').forEach((completeButton) => {
        fireEvent.click(completeButton);
      });

      expect(handleClickCompleteTask).toBeCalledTimes(2);
    });
  });
});
