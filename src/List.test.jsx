import { render } from '@testing-library/react';

import List from './List';

describe('List component test', () => {
  context('When list with task', () => {
    it('Show list with task', () => {
      const tasks = [
        {
          id: 1,
          title: '뭐라도 하기',
        },
      ];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('뭐라도 하기');
    });
  });

  context('When list without task', () => {
    it('Shows other nodes', () => {
      const tasks = [];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
