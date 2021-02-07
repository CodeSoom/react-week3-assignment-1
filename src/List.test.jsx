import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));
  }

  context('without task', () => {
    it('renders message that there is no task', () => {
      const tasks = [];

      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '아무것도 안하기1' },
      { id: 2, title: '아무것도 안하기2' },
      { id: 3, title: '아무것도 안하기3' },
    ];

    it('render tasks', () => {
      const { container } = renderList(tasks);

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('renders "완료" button that is deleted when pressed', () => {
      const { getAllByText } = renderList(tasks);

      fireEvent.click(getAllByText('완료')[0]);

      expect(onClickDelete).toBeCalled();
    });
  });
});
