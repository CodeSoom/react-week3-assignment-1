import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const emptyTasksText = '할 일이 없어요!';
  const deleteTaskButtonText = '완료';
  const onClickDelete = jest.fn();

  const renderList = (tasks) => {
    const utils = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));

    return { ...utils };
  };

  context('without tasks', () => {
    const tasks = [];

    it('check element', () => {
      const { getByText } = renderList(tasks);

      getByText(emptyTasksText);
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '아무것도 안하기' },
      { id: 2, title: '본격적으로 아무것도 안하기' },
    ];

    it('check elements', () => {
      const { getByText } = renderList(tasks);

      tasks.forEach((task) => getByText(task.title));
    });

    it('check functions', () => {
      const { getAllByText } = renderList(tasks);
      const buttons = getAllByText(deleteTaskButtonText);

      expect(buttons).toHaveLength(tasks.length);
      expect(onClickDelete).not.toBeCalled();

      buttons.forEach((button) => fireEvent.click(button));

      expect(onClickDelete).toBeCalledTimes(tasks.length);
    });
  });
});
