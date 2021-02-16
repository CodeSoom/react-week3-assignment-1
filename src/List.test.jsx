import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  function getListComponentContainer(tasks) {
    const { container } = render((
      <List tasks={tasks} />
    ));
    return container;
  }

  context('할일이 1개 있는 경우', () => {
    const tasks = [
      { id: 1, title: 'testTitle' },
    ];

    it('할 일 1개를 표시한다.', () => {
      const container = getListComponentContainer(tasks);
      expect(container).toHaveTextContent('testTitle');
    });
  });

  context('할일이 2개 이상 있는 경우', () => {
    const tasks = [
      { id: 1, title: 'testTitle' },
      { id: 2, title: 'testTitle2' },
      { id: 3, title: 'testTitle3' },
    ];

    it('할 일 목록을 모두 표시한다.', () => {
      const container = getListComponentContainer(tasks);
      expect(container).toHaveTextContent('testTitle');
      expect(container).toHaveTextContent('testTitle2');
      expect(container).toHaveTextContent('testTitle3');
    });
  });

  context('할일이 없는 경우', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const container = getListComponentContainer(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
