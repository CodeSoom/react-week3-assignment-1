import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  test('empty task', () => {
    const { container } = render((
      <List tasks={[]} />
    ));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('task', () => {
    const { container } = render((
      <List tasks={[{ id: 1, task: '새로운할일' }]} />
    ));
    expect(container).toHaveTextContent('완료');
  });
});
