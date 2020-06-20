import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Item from './Item';

function renderItem({ task, onClickDelete }) {
  render(<Item
    task={task}
    onClickDelete={onClickDelete}
  />);

  const titleElement = screen.getByText(task.title);
  const deleteButton = screen.getByRole('button', { name: /완료/i });

  return {
    titleElement,
    clickDeleteButton: () => fireEvent.click(deleteButton),
  };
}

describe('<Item />', () => {
  context('with task', () => {
    it('print title of task', () => {
      // given
      const task = { id: 1, title: '오늘 할 일' };
      // when
      const { titleElement } = renderItem({ task, onClickDelete: jest.fn() });
      // then
      expect(titleElement).toBeInTheDocument();
    });
  });

  context('when clicked delete button', () => {
    it('notify which task has been clicked', () => {
      // given
      const task = { id: 1, title: '오늘 할 일' };
      const handleClickDelete = jest.fn();
      // when
      const { clickDeleteButton } = renderItem({ task, onClickDelete: handleClickDelete });
      clickDeleteButton();
      // then
      expect(handleClickDelete).toBeCalledTimes(1);
      expect(handleClickDelete).toBeCalledWith(task.id);
    });
  });
});
