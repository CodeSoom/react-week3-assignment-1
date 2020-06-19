import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('when tasks is not empty', () => {
    it('render tasks', () => {
      const tasks = [
        {
          id: 1,
          title: '테스트 어려운거구나',
        },
      ];

      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent('완료');
    });
  });

  context('when tasks is empty', () => {
    it('render empty message', () => {
      const { container } = render(<List tasks={[]} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
