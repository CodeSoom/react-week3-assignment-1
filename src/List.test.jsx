import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('TodoList 컴포넌트', () => {
  const handleClickDelete = jest.fn();

  function renderTodoList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '멋대로 살기' },
      { id: 2, title: '아무렇게나 살기' },
    ];

    it('할 일 목록 렌더링', () => {
      const { getByText } = renderTodoList(tasks);

      expect(getByText(/멋대로 살기/)).not.toBeNull();
      expect(getByText(/아무렇게나 살기/)).not.toBeNull();
    });

    it('완료 버튼 누르기', () => {
      const { getAllByText } = renderTodoList(tasks);

      expect(handleClickDelete).not.toBeCalled();

      const buttons = getAllByText('완료');
      fireEvent.click(buttons[0]);

      expect(handleClickDelete).toBeCalledWith(1);
    });
  });

  context('without tasks', () => {
    it('할 일이 없어요! 렌더링', () => {
      const { getByText } = renderTodoList([]);
      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });
});
