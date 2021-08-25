import { render } from '@testing-library/react';

import List from './List';

describe('List component', () => {
  context('when there is no todo item', () => {
    it('returns "할 일이 없어요!"', () => {
      const tasks = [];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('when there are todo items', () => {
    it('returns todo items', () => {
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
