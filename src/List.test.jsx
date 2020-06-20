import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import List from './List';

function renderList({ tasks, onClickDelete }) {
  render(<List
    tasks={tasks}
    onClickDelete={onClickDelete}
  />);

  const nothingTaskMessageElement = screen.queryByText(/할 일이 없어요!/i);
  const taskListItems = screen.queryAllByRole('listitem', { name: '' });
  const doneButtons = screen.queryAllByRole('button', { name: /완료/i });

  return {
    nothingTaskMessageElement,
    taskListItems,
    doneButtons,
    clickDoneButton: (index) => fireEvent.click(doneButtons[index]),
  };
}

describe('<List />', () => {
  context('without tasks', () => {
    it('print message that there is nothing task', () => {
      // given
      const tasks = [];
      // when
      const { nothingTaskMessageElement } = renderList({ tasks, onClickDelete: jest.fn() });
      // then
      expect(nothingTaskMessageElement).toBeInTheDocument();
    });

    it('do not print task item', () => {
      // given
      const tasks = [];
      // when
      const { taskListItems } = renderList({ tasks, onClickDelete: jest.fn() });
      // then
      expect(taskListItems).toHaveLength(0);
    });
  });

  context('with tasks', () => {
    it('print the items along with the Done buttons', () => {
      // given
      const taskCount = 10;
      const tasks = [...Array(taskCount)].map((value, index) => ({ id: index + 1, title: `${index} 번째 할 일` }));
      // when
      const { taskListItems, doneButtons } = renderList({ tasks, onClickDelete: jest.fn() });
      // then
      expect(taskListItems).toHaveLength(taskCount);
      expect(doneButtons).toHaveLength(taskCount);
    });

    it('can click the Done buttons', () => {
      // given
      const tasks = [...Array(10)].map((value, index) => ({ id: index + 1, title: `${index} 번째 할 일` }));
      const handleClickDelete = jest.fn();
      // when
      const { clickDoneButton } = renderList({ tasks, onClickDelete: handleClickDelete });
      const clickCount = 3;
      [...Array(clickCount)].forEach((value, index) => clickDoneButton(index));
      // then
      expect(handleClickDelete).toBeCalledTimes(clickCount);
    });
  });
});
