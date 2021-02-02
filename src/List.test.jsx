import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

const onClickDelete = jest.fn();

function showListWith(tasks, handleClick = onClickDelete) {
  return render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));
}

describe('List에서', () => {
  context('tasks의 길이가 0일 때', () => {
    const tasks = [];

    it('할 일이 없다는 것을 보여준다.', () => {
      const { container } = showListWith(tasks);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks에 여러가지 할 일들이 있을 때', () => {
    const tasks = [
      { id: 1, title: '볶음밥 만들기' },
      { id: 2, title: '누워있기' },
      { id: 3, title: '계속 누워있기' },
    ];

    it('그 일들을 모두 보여준다.', () => {
      const { container } = showListWith(tasks);

      expect(container).toHaveTextContent('볶음밥 만들기');
      expect(container).toHaveTextContent('누워있기');
      expect(container).toHaveTextContent('계속 누워있기');
    });
  });
});
