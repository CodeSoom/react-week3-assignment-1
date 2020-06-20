import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  context('without todos', () => {
    it('renders empty message', () => {
      const todos = [];
      const { container } = render((
        <Page
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={todos}
        />
      ));

      const inputBox = container.querySelector('#input-task-title');

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(inputBox).toBeInTheDocument();
      expect(container).toHaveTextContent('추가');
      expect(inputBox.value).toBe('');
      expect(container).toHaveTextContent('할 일이 없어요!');

      expect(handleChangeTitle).not.toBeCalled();
      expect(handleClickAddTask).not.toBeCalled();
    });
  });

  context('when input todo', () => {
    const userInputText = 'Distribute new version';
    const todos = [];
    it('renders todo', () => {
      const userInputEvent = { target: { value: userInputText } };
      const { container } = render((
        <Page
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={todos}
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
          tasks={todos}
        />
      ));

      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalledTimes(1);
    });
  });

  context('with todos', () => {
    it('renders todos', () => {
      const todos = [
        {
          id: 1,
          title: 'Distribute new version',
        }, {
          id: 2,
          title: 'Fix critical error',
        },
      ];

      const { container } = render((
        <Page
          tasks={todos}
        />
      ));

      todos.forEach((element) => {
        expect(container).toHaveTextContent(element.title);
      });
    });
  });
});
