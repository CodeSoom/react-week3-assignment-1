import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDeleteTask = jest.fn();

  function renderList(tasks = []) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={onClickDeleteTask}
      />
    ));
  }

  context('tasks의 length가 0인 경우', () => {
    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderList();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks length가 1 이상인 경우', () => {
    const tasks = [
      {
        id: 1,
        title: '공부하기',
      },
      {
        id: 2,
        title: '운동하기',
      },
    ];

    it('tasks의 항목들을 모두 표시한다.', () => {
      const { container, getAllByText, getAllByTestId } = renderList(tasks);

      expect(getAllByTestId('todo-item')).toHaveLength(2);
      expect(getAllByText('완료')).toHaveLength(2);

      tasks.forEach((todoItem) => {
        expect(container).toHaveTextContent(todoItem.title);
      });
    });

    it('완료 버튼을 누르면 할일이 제거된다.', () => {
      const { container, getAllByText, getAllByTestId } = renderList(tasks);

      expect(getAllByTestId('todo-item')).toHaveLength(2);
      expect(getAllByText('완료')).toHaveLength(2);

      tasks.forEach((todoItem) => {
        expect(container).toHaveTextContent(todoItem.title);
      });

      fireEvent.click(getAllByText('완료')[0]);

      expect(onClickDeleteTask).toBeCalledWith(1);
    });
  });
});
