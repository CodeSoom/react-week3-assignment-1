import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  it('List empty tasks', () => {
    const tasks = [];
    const { container } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
