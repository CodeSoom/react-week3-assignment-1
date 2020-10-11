import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('tasks가 없을 때', () => {
    const tasks = [];

    it('빈 메시지를 표현한다', () => {
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks가 있을 때', () => {
    const tasks = [
      {
        id: 1,
        title: '테스트 코드 작성',
      },
      {
        id: 2,
        title: '공부 하기',
      },
    ];

    it('tasks 목록을 출력한다', () => {
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);
    });
  });
});
