import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('tasks가 없을 때', () => {
    const tasks = [];

    it('빈 메세지를 표시한다', () => {
      const { container } = render(<List tasks={tasks} />);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks가 있을 때', () => {
    const tasks = [
      {
        id: 1,
        title: '뭐라도 하기1',
      },
      {
        id: 2,
        title: '뭐라도 하기2',
      },
      {
        id: 3,
        title: '뭐라도 하기3',
      },
    ];

    it('tasks 목록을 출력한다', () => {
      const { container } = render(<List tasks={tasks} />);

      tasks.forEach(({ title }) => {
        expect(container.toHaveTextContent(title));
      });
    });
  });
});
