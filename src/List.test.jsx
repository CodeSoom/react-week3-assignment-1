import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const tasks = [
    { id: 1, title: '과제1' },
    { id: 2, title: '과제2' },
    { id: 3, title: '과제3' },
  ];

  const handleClick = jest.fn();

  it('renders items', () => {
    const { getAllByText } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />
    ));

    const renderedItems = getAllByText('완료');
    expect(renderedItems.length).toBe(tasks.length);
  });
});
