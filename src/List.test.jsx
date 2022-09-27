import { render } from '@testing-library/react';

import List from './List';

describe('List component test', () => {
  context('When there task on the list', () => {
    it('Show Tasks on the list', () => {
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

  context('When there no task on the list', () => {
    it('Show other specific nodes (할 일이 없어요!)', () => {
      const tasks = [];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
