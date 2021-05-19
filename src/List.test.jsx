import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('TodoList 컴포넌트', () => {
  it('할 일이 없을 때', () => {
    const { container } = render((<List tasks={[]} />));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('할 일이 있을 때', () => {
    const tasks = [
      { id: 1, title: '멋대로 살기' },
      { id: 2, title: '아무렇게나 살기' },
    ];

    const { container } = render((<List tasks={tasks} />));
    expect(container).toHaveTextContent('멋대로 살기완료');
    expect(container).toHaveTextContent('아무렇게나 살기완료');
  });
});
