import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  it('nothing to-do', () => {
    const tasks = [];

    const { container } = render((
      <List
        tasks={tasks}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('have to-do', () => {
    const tasks = [
      { id: 1, title: '잠자기' },
      { id: 2, title: '산책하기' },
    ];

    const { container } = render((
      <List
        tasks={tasks}
        onClick={handleClick}
      />
    ));

    expect(container).toHaveTextContent('잠자기');
    expect(container).toHaveTextContent('산책하기');
    expect(container).toHaveTextContent('완료');
  });
});
