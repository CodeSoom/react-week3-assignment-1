import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('Without tasks', () => {
    const tasks = [];

    it('renders "no tasks message"', () => {
      const { container } = renderList(tasks);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('With tasks', () => {
    const tasks = [
      {
        id: 1,
        title: '아무것도 하지 않기 #1',
      },
      {
        id: 2,
        title: '아무것도 하지 않기 #2',
      },
    ];

    it('renders tasks', () => {
      const { container } = renderList(tasks);

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('deletes todo item when the delete button is clicked', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      buttons.forEach((button) => {
        fireEvent.click(button);
        expect(handleClickDelete).toBeCalledWith(1);
      });
    });
  });
});
