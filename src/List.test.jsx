import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import List from './List';

const handleClickDelete = jest.fn();

function renderList(tasks) {
  render(<List
    tasks={tasks}
    onClickDelete={handleClickDelete}
  />);

  return {
    nothingTaskMessageElement: screen.queryByText(/할 일이 없어요!/i),
    taskListItems: screen.queryAllByRole('listitem', { name: '' }),
    doneButtons: screen.queryAllByRole('button', { name: /완료/i }),
  };
}

describe('<List />', () => {
  context('without tasks', () => {
    it('print message that there is nothing task', () => {
      // given
      const tasks = [];
      // when
      const { nothingTaskMessageElement } = renderList(tasks);
      // then
      expect(nothingTaskMessageElement).toBeInTheDocument();
    });

    it('do not print task item', () => {
      // given
      const tasks = [];
      // when
      const { taskListItems } = renderList(tasks);
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
      const { taskListItems, doneButtons } = renderList(tasks);
      // then
      expect(taskListItems).toHaveLength(taskCount);
      expect(doneButtons).toHaveLength(taskCount);
    });

    it('can click the Done buttons', () => {
      // given
      const tasks = [...Array(10)].map((value, index) => ({ id: index + 1, title: `${index} 번째 할 일` }));
      handleClickDelete.mockClear();
      // when
      const { doneButtons } = renderList(tasks);
      const clickCount = 3;
      [...Array(clickCount)].forEach((value, index) => fireEvent.click(doneButtons[index]));
      // then
      expect(handleClickDelete).toBeCalledTimes(clickCount);
    });
  });
});
