import React from 'react';

import { render } from '@testing-library/react';

import List from './List';


describe('List', () => {
  context('tasks의 length가 0인 경우', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = render((
        <List
          tasks={tasks}
        />
      ));

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
      }
    ];

    it('"공부하기!"를 표시한다.', () => {
      const { container } = render((
        <List
          tasks={tasks}
        />
      ));

      expect(container).toHaveTextContent('공부하기');
      expect(container).toHaveTextContent('운동하기');
    });

  });

});
