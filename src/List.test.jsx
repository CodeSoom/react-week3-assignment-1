import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('할일이 있는 경우', () => {
    const tasks = [
      { id: 1, title: 'testTitle' },
    ];

    it('할 일 목록을 표시한다.', () => {
      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('testTitle');
    });
  });

  context('할일이 없는 경우', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
