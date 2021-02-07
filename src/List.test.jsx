import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleClickDelete = jest.fn();

  const renderList = ({ tasks }) => render((
    <List tasks={tasks} onClickDelete={handleClickDelete} />
  ));

  context('without tasks', () => {
    it('renders no task message', () => {
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const tasks = [
        { id: 1, title: '코딩하기' },
        { id: 2, title: '홈트하기' },
      ];

      const { container, getAllByText } = renderList({ tasks });

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);

      fireEvent.click(getAllByText('완료')[0]);

      expect(handleClickDelete).toBeCalled();

      fireEvent.click(getAllByText('완료')[1]);

      expect(handleClickDelete).toBeCalledTimes(2);
    });
  });
});
