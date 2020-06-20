import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';
import todos from './Todos';

describe('List', () => {
  context('without todos', () => {
    it('renders empty message', () => {
      const emptyTodos = [];

      const { container } = render((
        <List
          tasks={emptyTodos}
        />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('with todos', () => {
    it('renders todos', () => {
      const handleClickCompleteTask = jest.fn();

      const { container, getAllByText } = render((
        <List
          tasks={todos}
          onClickDelete={handleClickCompleteTask}
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
