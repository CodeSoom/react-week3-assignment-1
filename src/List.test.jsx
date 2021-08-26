import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('without todo items', () => {
    it('renders "할 일이 없어요!"', () => {
      const tasks = [];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with todo items', () => {
    it('renders todo items', () => {
      const tasks = [{
        id: 100,
        title: 'something',
      }];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('something');
    });
  });
});
