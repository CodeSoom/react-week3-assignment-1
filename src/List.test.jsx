import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [];

  const onClickDelete = jest.fn();

  const { container } = render(
    <List tasks={tasks} onClick={onClickDelete} />,
  );

  if (tasks.length === 0) {
    expect(container).toHaveTextContent('할 일이 없어요!');
  }
});
