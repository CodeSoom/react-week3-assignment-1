import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import List from './List';

describe('List', () => {
  it('if there is no task', () => {
    const tasks = [];
    const { container } = render((
      <List
        tasks={tasks}
      />
    ));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('if there is task', () => {
    const tasks = [
      {
        id: 1,
        title: '1',
      },
    ];
    const { container } = render((
      <List
        tasks={tasks}
      />
    ));
    expect(container).not.toHaveTextContent('할 일이 없어요!');
    expect(container).toHaveTextContent('완료');
  });
});
