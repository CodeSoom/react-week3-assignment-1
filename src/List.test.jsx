import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();
  context('tasks의 length가 0 인 경우', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 출력한다.', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={handleClick} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
  context('tasks의 length가 1 이상인 경우', () => {
    const tasks = [
      { id: 1, title: '딸기' },
      { id: 2, title: '당근' },
      { id: 3, title: '수박' },
      { id: 4, title: '참외' },
      { id: 5, title: '메론 게임' },
    ];
    it('"차례대로 딸기 당근 수박 참외 메론 게임"을 출력한다.', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={handleClick} />
      ));

      tasks.map((task) => (
        expect(container).toHaveTextContent(task.title)
      ));
    });
  });
});
