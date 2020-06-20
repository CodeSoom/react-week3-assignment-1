import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Item from './Item';

const handleClickDelete = jest.fn();

function renderItem(task) {
  render(<Item
    task={task}
    onClickDelete={handleClickDelete}
  />);

  return {
    titleElement: screen.getByText(task.title),
    deleteButton: screen.getByRole('button', { name: /완료/i }),
  };
}

describe('<Item />', () => {
  context('with task', () => {
    it('print title of task', () => {
      // given
      const task = { id: 1, title: '오늘 할 일' };
      // when
      const { titleElement } = renderItem(task);
      // then
      expect(titleElement).toBeInTheDocument();
    });
  });

  context('when clicked delete button', () => {
    it('notify which task has been clicked', () => {
      // given
      const task = { id: 1, title: '오늘 할 일' };
      handleClickDelete.mockClear();
      // when
      const { deleteButton } = renderItem(task);
      fireEvent.click(deleteButton);
      // then
      expect(handleClickDelete).toBeCalledTimes(1);
      expect(handleClickDelete).toBeCalledWith(task.id);
    });
  });
});
