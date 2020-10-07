import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const emptyTasksText = '할 일이 없어요!';
  const deleteTaskButtonText = '완료';

  const setup = ({ tasks, onClickDelete = jest.fn() }) => {
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
      const { getByText } = setup({ tasks });

      getByText(emptyTasksText);
    });
  });

  context('with tasks', () => {
    const onClickDelete = jest.fn();
    const tasks = [
      { id: 1, title: '아무것도 안하기' },
      { id: 2, title: '본격적으로 아무것도 안하기' },
    ];

    it('check elements', () => {
      const { getByText } = setup({ tasks });

      tasks.forEach((task) => getByText(task.title));
    });

    it('check functions', () => {
      const { getAllByText } = setup({ tasks, onClickDelete });

      expect(onClickDelete).not.toBeCalled();

      getAllByText(deleteTaskButtonText)
        .forEach((button) => fireEvent.click(button));

      expect(onClickDelete).toBeCalledTimes(2);
    });
  });
});
