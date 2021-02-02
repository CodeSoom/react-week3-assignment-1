import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClick={handleClickDelete}
      />
    ));
  }

  context('without task', () => {
    it('rendrs message', () => {
      const tasks = [];

      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('render tasks and listen click event', () => {
      const tasks = [
        { id: 1, title: '아무것도 안하기1' },
        { id: 2, title: '아무것도 안하기2' },
        { id: 3, title: '아무것도 안하기3' },
      ];

      const { container, getAllByText } = renderList(tasks);

      expect(container).toHaveTextContent('아무것도 안하기1');
      expect(container).toHaveTextContent('아무것도 안하기2');
      expect(container).toHaveTextContent('아무것도 안하기3');

      fireEvent.click(getAllByText('완료')[0]);

      expect(handleClickDelete).toBeCalled();
    });
  });
});
