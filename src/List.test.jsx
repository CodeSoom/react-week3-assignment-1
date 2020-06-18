import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List Test', () => {
  test('When One Task', () => {
    const tasks = [
      {
        id: 1,
        title: '테스트 어려운거구나',
      },
    ];

    const { container } = render(
      <List
        tasks={tasks}
      />,
    );

    expect(container).toHaveTextContent(/테스트/);
    expect(container.firstChild).toContainHTML('<ol>');
  });

  test('When Empty Task', () => {
    const tasks = [];

    const { container } = render(
      <List
        tasks={tasks}
      />,
    );

    expect(container).not.toHaveTextContent(/테스트/);
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
