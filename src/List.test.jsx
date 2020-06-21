import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';
import { TASKS } from './mocks/data';

describe('List', () => {
  let handleClickDelete;

  beforeEach(() => {
    handleClickDelete = jest.fn();
  });

  context('without tasks', () => {
    it('renders no task message', () => {
      const tasks = [];

      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const tasks = TASKS;

      const { container, getAllByText } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      tasks.forEach(
        (task) => expect(container).toHaveTextContent(task.title),
      );

      expect(handleClickDelete).not.toBeCalled();
      getAllByText('완료').forEach(
        (button) => fireEvent.click(button),
      );
      expect(handleClickDelete).toBeCalled();
    });
  });
});
