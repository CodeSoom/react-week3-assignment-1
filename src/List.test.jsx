import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

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
      const tasks = [
        { id: 1, title: '어렵다...ㅠㅠ' },
      ];

      const { container, getByText } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(container).toHaveTextContent(tasks[0].title);

      expect(handleClickDelete).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(handleClickDelete).toBeCalled();
    });
  });
});
