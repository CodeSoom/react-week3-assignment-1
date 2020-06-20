import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';

describe('List', () => {
  context('without todos', () => {
    it('renders empty message', () => {
      const todos = [];

      const { container } = render((
        <List
          tasks={todos}
        />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('with todos', () => {
    it('renders todos', () => {
      const handleClickCompleteTask = jest.fn();
      const todos = [
        {
          id: 1,
          title: 'Distribute new version',
        }, {
          id: 2,
          title: 'Fix critical error',
        },
      ];

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
