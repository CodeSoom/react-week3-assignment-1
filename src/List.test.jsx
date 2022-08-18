import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('nothing to-do', () => {
    const tasks = [];
    const { container } = render((
      <List
        tasks={tasks}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
